export const font400 = fetch(
  new URL(
    "../../../assets/fonts/avenir-next/avenir-next-400.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

export const font500 = fetch(
  new URL(
    "../../../assets/fonts/avenir-next/avenir-next-500.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());

export const font700 = fetch(
  new URL(
    "../../../assets/fonts/avenir-next/avenir-next-700.ttf",
    import.meta.url
  )
).then((res) => res.arrayBuffer());
