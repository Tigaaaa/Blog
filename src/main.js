import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/index'
import store from '@/store/index'

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

createApp(App).use(router).use(store).use(VueMarkdownEditor).use(VMdPreview).mount('#app')
