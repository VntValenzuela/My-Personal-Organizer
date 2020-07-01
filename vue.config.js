module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import '@/sass/main.scss'`
      }
    }
  },

  runtimeCompiler: true,

  chainWebpack: config => {
    ["vue-modules", "vue", "normal-modules", "normal"].forEach(match => {
      config.module
        .rule("scss")
        .oneOf(match)
        .use("sass-loader")
        .tap(opt =>
          Object.assign(opt, {
            prependData: `@import '@/sass/main.scss';`
          })
        );
    });

    if (process.env.NODE_ENV === "test") {
      const scssRule = config.module.rule("sass");
      scssRule.uses.clear();
      scssRule.use("null-loader").loader("null-loader");
    }
  }
};
