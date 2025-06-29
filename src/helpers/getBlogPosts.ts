let blogCache: any[] | null = null;

export const getBlogPosts = async (limit?: number) => {
  if (!blogCache) {
    const blogPosts = await getCollection('blog');

    blogCache = blogPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }

  if (typeof limit === 'number' && limit > 0) {
    return blogCache.slice(0, limit);
  }

  return blogCache;
};
