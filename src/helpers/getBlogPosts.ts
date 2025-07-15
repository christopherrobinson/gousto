type GetBlogPostsOptions = {
  limit?: number;
};

let blogCache: any[] | null = null;

export const getBlogPosts = async (options: GetBlogPostsOptions = {}) => {
  if (!blogCache) {
    const blogPosts = await getCollection('blog');
    const today = new Date();

    blogCache = blogPosts
      .filter(post => (import.meta.env.MODE === 'production') ? (post.data.date <= today) : true)
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  }

  return (typeof options.limit === 'number') ? blogCache.slice(0, options.limit) : blogCache;
};
