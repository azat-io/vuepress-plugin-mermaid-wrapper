import type { VNode } from 'vue'

import { defineComponent, onMounted, nextTick, ref, h } from 'vue'
import { defineClientConfig } from '@vuepress/client'

declare let __MERMAID_WRAPPER_THEME_VARIABLES__: {
  [key: string]: boolean | string
}

let MermaidComponent = defineComponent({
  setup: props => {
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

      svgCode.value = ''
      document.body.appendChild(container)

      nextTick(async () => {
        let codeValue = await render(props.id, code, container)
        svgCode.value = codeValue.svg
        document.body.removeChild(container)
      })
    })

    return (): VNode =>
      h('div', {
        innerHTML: svgCode.value,
        class: ['mermaid'],
        ref: el,
      })
  },
  props: {
    code: {
      required: true,
      type: String,
      default: '',
    },
    config: {
      type: String,
      default: '',
    },
    id: {
      required: true,
      type: String,
    },
  },
  name: 'Mermaid',
})

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component('mermaid', MermaidComponent)
  },
})
