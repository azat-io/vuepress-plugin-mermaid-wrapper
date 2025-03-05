# vuepress-plugin-mermaid-wrapper

<img src="https://avatars.githubusercontent.com/u/48539483?s=100" align="right" alt="VuePress" />

[![Version](https://img.shields.io/npm/v/vuepress-plugin-mermaid-wrapper.svg?color=4fb17b&labelColor=2a2f44)](https://npmjs.com/package/vuepress-plugin-mermaid-wrapper)
[![Monthly Download](https://img.shields.io/npm/dm/vuepress-plugin-mermaid-wrapper.svg?color=4fb17b&labelColor=2a2f44)](https://npmjs.com/package/vuepress-plugin-mermaid-wrapper)
[![GitHub License](https://img.shields.io/badge/license-MIT-4fb17b.svg?color=4fb17b&labelColor=2a2f44)](https://github.com/azat-io/eslint-plugin-de-morgan/blob/main/license.md)

VuePress v2 plugin provides a global component wrapping [Mermaid](https://mermaid-js.github.io/mermaid). Mermaid is a JavaScript library which lets you create diagrams and visualizations using text and code.

## Installation

```sh
npm install --save vuepress-plugin-mermaid-wrapper
```

## Usage

Add plugin to your VuePress config:

```js
import { mermaidWrapperPlugin } from 'vuepress-plugin-mermaid-wrapper'

export default {
  plugins: [
    mermaidWrapperPlugin({
      /* options */
    }),
  ],
}
```

That's all. You can use Mermaid in you Markdown files:

## Options

### themeVariables

- Type: `object`

- Required: `false`

- Details:

  Style customization of Mermaid theme. See [Mermaid theme variables](https://mermaid-js.github.io/mermaid/#/theming?id=customizing-themes-with-themevariables).

## Contribution

Pull requests are welcome.
