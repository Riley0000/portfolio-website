module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("./css/"); 
    eleventyConfig.addWatchTarget("./css/");
    eleventyConfig.addPassthroughCopy("fonts");

}

module.exports = config => {
    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: 'src',
            output: 'dist'
      }
    };
  };