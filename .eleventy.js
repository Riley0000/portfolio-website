require("dotenv").config();

const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("style.css");
};

const ghostContentAPI = require("@tryghost/content-api");

const api = new ghostContentAPI({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version: "v2"
});

const db = require('db')
db.connect({
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS
})

const stripDomain = url => {
  return url.replace(process.env.GHOST_API_URL, "");
};

config.addCollection("docs", async function(collection) {
  collection = await api.pages
    .browse({
      include: "authors",
      limit: "all"
    })
    .catch(err => {
      console.error(err);
    });

  collection.map(doc => {
    doc.url = stripDomain(doc.url);
    doc.primary_author.url = stripDomain(doc.primary_author.url);

    // Convert publish date into a Date object
    doc.published_at = new Date(doc.published_at);
    return doc;
  });

  return collection;
});

  // Get all tags
  config.addCollection("tags", async function(collection) {
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

    // Attach posts to their respective tags
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
