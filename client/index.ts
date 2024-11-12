import type { VNode } from 'vue'

import { defineComponent, onMounted, nextTick, ref, h } from 'vue'
import { defineClientConfig } from '@vuepress/client'

declare let __MERMAID_WRAPPER_THEME_VARIABLES__: Record<
  string,
  boolean | string
>

let MermaidComponent = defineComponent({
  setup: props => {
    let element = ref<HTMLDivElement>()
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
      document.body.append(container)

      await nextTick(async () => {
        let codeValue = await render(props.id, code, container)
        svgCode.value = codeValue.svg
        container.remove()
      })
    })

    return (): VNode =>
      h('div', {
        innerHTML: svgCode.value,
        class: ['mermaid'],
        ref: element,
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
