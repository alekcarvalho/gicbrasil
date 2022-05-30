import { useHead as originalUseHead } from '@vueuse/head'
import Config from '~/config/config.json'

export const customHead = (head) =>
  originalUseHead({
    ...head,
    title:
      head && head.title
        ? `${head.title} | ${Config.title}`
        : `${Config.title}`,
  })
