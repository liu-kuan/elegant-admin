import type { App, Directive } from 'vue'
import center from './center'
import focus from './focus'
import resizeOb from './resize-ob'

const directives: Record<string, Directive> = { center, resizeOb, focus }

export const registerDirectives = (app: App<Element>) => {
  for (const key in directives) {
    app.directive(key, (directives as Record<string, Directive>)[key])
  }
}
