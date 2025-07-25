import type { Plugin } from '@vuepress/core'
import type MarkdownIt from 'markdown-it'

import { getDirname, path, hash } from '@vuepress/utils'

let __dirname = getDirname(import.meta.url)

interface MermaidWrapperPluginOptions {
  themeVariables?: Record<string, boolean | string>
}

export let mermaidWrapperPlugin =
  ({ themeVariables = {} }: MermaidWrapperPluginOptions): Plugin =>
  () => ({
    extendsMarkdown: (md: MarkdownIt) => {
      md.use((markdownIt): void => {
        let originFence = markdownIt.renderer.rules.fence?.bind(
          markdownIt.renderer.rules,
        )

        markdownIt.renderer.rules.fence = (...arguments_) => {
          let [tokens, index] = arguments_
          let { info: languageType, content } = tokens[index]!

          if (content && languageType.trim() === 'mermaid') {
            return `
            <mermaid
              id="mermaid-${hash(index)}"
              code="${content.trim()}"
            ></mermaid>
          `
          }

          if (originFence) {
            return originFence(...arguments_)
          }

          return ''
        }
      })
    },
    define: {
      __MERMAID_WRAPPER_THEME_VARIABLES__: themeVariables,
    },
    clientConfigFile: path.resolve(__dirname, '../client/index.js'),
    name: 'vuepress-plugin-mermaid-wrapper',
  })
