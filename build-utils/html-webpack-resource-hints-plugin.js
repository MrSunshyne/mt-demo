'use strict'

/**
 * HtmlWebpackResourceHintsPlugin plugin
 * @class
 */
module.exports = class HtmlWebpackResourceHintsPlugin {
  constructor(options = {}) {
    this.options = options
    this.options.preload = options.preload || []
    this.options.prefetch = options.prefetch || []
    this.options.dnsPrefetch = options.dnsPrefetch || []
    this.options.prerender = options.prerender || []
    this.options.preconnect = options.preconnect || []
  }

  createResourceLinkTag(origin, type) {
    // webpack config may contain quotes, remove that
    const href = origin.replace(/['"]+/g, '')

    const attributes = {
      href,
      rel: type,
    }

    if (!origin.startsWith(this.origin)) {
      attributes.crossorigin = true
    }

    return {
      tagName: 'link',
      selfClosingTag: false,
      attributes,
    }
  }

  addPreconnectLinks(htmlPluginData, callback) {
    this.options.preload.forEach((origin) =>
      htmlPluginData.head.push(this.createResourceLinkTag(origin, 'preload'))
    )
    this.options.prefetch.forEach((origin) =>
      htmlPluginData.head.push(this.createResourceLinkTag(origin, 'prefetch'))
    )
    this.options.dnsPrefetch.forEach((origin) =>
      htmlPluginData.head.push(
        this.createResourceLinkTag(origin, 'dns-prefetch')
      )
    )
    this.options.prerender.forEach((origin) =>
      htmlPluginData.head.push(this.createResourceLinkTag(origin, 'prerender'))
    )
    this.options.preconnect.forEach((origin) =>
      htmlPluginData.head.push(this.createResourceLinkTag(origin, 'preconnect'))
    )
    callback(null, htmlPluginData)
  }

  apply(compiler) {
    // Webpack 4
    if (compiler.hooks) {
      compiler.hooks.compilation.tap(
        'HtmlWebpackResourceHintsPlugin',
        (compilation) => {
          // Hook into the html-webpack-plugin processing
          compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
            'HtmlWebpackResourceHintsPlugin',
            this.addPreconnectLinks.bind(this)
          )
        }
      )

      // Webpack 3
    } else {
      compiler.plugin('compilation', (compilation) => {
        // Hook into the html-webpack-plugin processing
        compilation.plugin(
          'html-webpack-plugin-alter-asset-tags',
          this.addPreconnectLinks.bind(this)
        )
      })
    }
  }
}
