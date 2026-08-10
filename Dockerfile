# Build stage — runs natively on the build host and cross-compiles to the
# target platform, so multi-arch CI builds don't pay for QEMU emulation.
# The runtime stage below is still per-target-arch (QEMU covers it), and the
# pushed manifest contains both linux/amd64 and linux/arm64 images.
FROM --platform=$BUILDPLATFORM rust:1-trixie AS builder

ARG TARGETPLATFORM
RUN case "$TARGETPLATFORM" in \
      "linux/amd64") echo x86_64-unknown-linux-gnu > /rust-target ;; \
      "linux/arm64") echo aarch64-unknown-linux-gnu > /rust-target ;; \
      *) echo "unsupported target platform: $TARGETPLATFORM" >&2; exit 1 ;; \
    esac \
 && rustup target add "$(cat /rust-target)" \
 && apt-get update \
 && apt-get install -y --no-install-recommends \
      gcc-aarch64-linux-gnu libc6-dev-arm64-cross \
      gcc-x86-64-linux-gnu libc6-dev-amd64-cross \
 && rm -rf /var/lib/apt/lists/*

ENV CARGO_TARGET_X86_64_UNKNOWN_LINUX_GNU_LINKER=x86_64-linux-gnu-gcc \
    CARGO_TARGET_AARCH64_UNKNOWN_LINUX_GNU_LINKER=aarch64-linux-gnu-gcc \
    CC_x86_64_unknown_linux_gnu=x86_64-linux-gnu-gcc \
    CC_aarch64_unknown_linux_gnu=aarch64-linux-gnu-gcc

WORKDIR /app

# Cache the dependency build as its own layer.
COPY Cargo.toml Cargo.lock ./
RUN mkdir src \
 && echo 'fn main() {}' > src/main.rs \
 && cargo build --release --target "$(cat /rust-target)" \
 && rm -rf src

# Fonts and images are embedded into the binary via include_bytes!.
COPY assets assets
COPY public public
COPY src src
RUN touch src/main.rs \
 && cargo build --release --target "$(cat /rust-target)" \
 && cp "target/$(cat /rust-target)/release/sc-og" /sc-og

FROM debian:trixie-slim

RUN apt-get update \
 && apt-get install -y --no-install-recommends ca-certificates \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /sc-og /usr/local/bin/sc-og

# Kept for parity with the previous (Next.js) image, which baked these in at
# build time. The k8s deployment can also provide them at runtime instead.
ARG PUBLIC_SUPABASE_URL
ARG SUPABASE_ADMIN_KEY
ENV PUBLIC_SUPABASE_URL=$PUBLIC_SUPABASE_URL \
    SUPABASE_ADMIN_KEY=$SUPABASE_ADMIN_KEY

USER 65534:65534

EXPOSE 3000

CMD ["sc-og"]
