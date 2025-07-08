type GetBlogPostsOptions = {
  limit?: number;
};

let blogCache: any[] | null = null;

export const getBlogPosts = async (options: GetBlogPostsOptions = {}) => {
  if (!blogCache) {
    const blogPosts = await getCollection('blog');

    blogCache = blogPosts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }

  // Apply limit if provided
  return (typeof options.limit === 'number') ? blogCache?.slice(0, options.limit) : blogCache;
};
