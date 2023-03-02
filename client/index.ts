import type { VNode } from 'vue'

import { defineComponent, onMounted, nextTick, ref, h } from 'vue'
import { defineClientConfig } from '@vuepress/client'

declare let __MERMAID_WRAPPER_THEME_VARIABLES__: {
  [key: string]: string | boolean
}

let MermaidComponent = defineComponent({
  name: 'Mermaid',
  props: {
    id: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
      default: '',
    },
    config: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    let el = ref<HTMLDivElement>()
    let svgCode = ref('')

    onMounted(async () => {
      let { initialize, render } = (await import('mermaid')).default
      let code = decodeURIComponent(props.code)

      initialize({
        themeVariables: __MERMAID_WRAPPER_THEME_VARIABLES__,
        startOnLoad: false,
      })

      let container = document.createElement('div')

      let renderCallback = (codeValue: string): void => {
        svgCode.value = codeValue
        document.body.removeChild(container)
      }

      svgCode.value = ''
      document.body.appendChild(container)

      nextTick(() => {
        render(props.id, code, renderCallback, container)
      })
    })

    return (): VNode =>
      h('div', {
        ref: el,
        class: ['mermaid'],
        innerHTML: svgCode.value,
      })
  },
})

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('mermaid', MermaidComponent)
  },
})
