import { ConversationFlavor } from '@grammyjs/conversations'
import { Context as BaseContext } from 'grammy'

type Context = BaseContext &
  ConversationFlavor & {
    config: {
      botDeveloper: number
      isDeveloper: boolean
    }
  }

export default Context
