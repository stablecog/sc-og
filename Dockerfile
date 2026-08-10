FROM rust:1-trixie AS builder

WORKDIR /app

# Cache the dependency build as its own layer.
COPY Cargo.toml Cargo.lock ./
RUN mkdir src \
 && echo 'fn main() {}' > src/main.rs \
 && cargo build --release \
 && rm -rf src

# Fonts and images are embedded into the binary via include_bytes!.
COPY assets assets
COPY public public
COPY src src
RUN touch src/main.rs \
 && cargo build --release \
 && cp target/release/sc-og /sc-og

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
