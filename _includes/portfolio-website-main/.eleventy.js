require("dotenv").config();

const ghostContentAPI = require("@tryghost/content-api");

const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v3"
});

const stripDomain = url => {
  return url.replace(process.env.GHOST_API_URL, "");
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("style.css");
   eleventyConfig.addCollection("posts", async function(collection) {
   collection = await api.posts
     .browse({
       include: "authors",
       limit: "all"
     })
     .catch(err => {
       console.error(err);
     });
    

   collection.forEach(doc => {
       doc.url = stripDomain(doc.url);
       doc.primary_author.url = stripDomain(doc.primary_author.url);

     // Convert publish date into a Date object
     doc.published_at = new Date(doc.published_at);
     return doc;
   });

   return collection;
 });

  // Get all tags
   eleventyConfig.addCollection("tags", async function(collection) {
     collection = await api.tags
       .browse({
         include: "count.posts",
         limit: "all"
       })
       .catch(err => {
         console.error(err);
       });

  // Get all posts with their tags attached
     const posts = await api.posts
       .browse({
         include: "tags,authors",
         limit: "all"
       })
       .catch(err => {
         console.error(err);
      });

     //Attach posts to their respective tags
     collection.forEach(async tag => {
       const taggedPosts = posts.filter(post => {
         post.url = stripDomain(post.url);
         return post.primary_tag && post.primary_tag.slug === tag.slug;
       });
       if (taggedPosts.length) tag.posts = taggedPosts;

       tag.url = stripDomain(tag.url);
     });

  return collection;
  });

};
