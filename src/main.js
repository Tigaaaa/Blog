import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)

import router from '@/router/index'
app.use(router)
import store from '@/store/index'
app.use(store)

//editor
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import '@kangc/v-md-editor/lib/style/preview.css'
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js'
import '@kangc/v-md-editor/lib/theme/style/github.css'
import Hljs from 'highlight.js'

VueMarkdownEditor.use(vuepressTheme,{Prism})
VMdPreview.use(githubTheme,{Hljs})
app.use(VueMarkdownEditor).use(VMdPreview)

//引入elementPlus-icons
import * as ElementIcons from '@element-plus/icons-vue'

for (const [key, component] of Object.entries(ElementIcons)) {
  app.component(key, component)
}

//挂载
app.mount('#app')
