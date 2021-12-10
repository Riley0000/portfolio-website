module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("style.css");
};

const ghostContentAPI = require("@tryghost/content-api");

const api = new ghostContentAPI ({
  url: process.env.GHOST_API_URL,
  key: process.env.GHOST_CONTENT_API_KEY,
  version:"v3"
});

config.addCollection("tags", async function(collection) {
  collection = await api.pages
    .browse({
      include: "tags",
      limit: "all"
    })
    .catch((err) => {
      console.error(err);
    });
