const cacheAge = 7 * 24 * 60 * 60;

export const sharedHeaders = {
  "Cache-Control": `public, max-age=${cacheAge}, stale-while-revalidate`,
};
