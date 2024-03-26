import { Bot, NextFunction, session } from 'grammy'
import startMongo from './helpers/startMongo'
import { studentHandler } from './handlers/studentHandler'
import env from './helpers/env'
import { conversations, createConversation } from '@grammyjs/conversations'
import Context from './models/Context'
import responseTime from './middlewares/responseTime'
import greeting from './conversations/greeting'

/** Measures the response time of the bot, and logs it to `console` */

async function setDeveloper(ctx: Context, next: NextFunction) {
  ctx.config = {
    botDeveloper: Number(env.BOT_DEVELOPER),
    isDeveloper: ctx.from?.id === Number(env.BOT_DEVELOPER),
  }
  await next()
}

export const bot = new Bot<Context>(env.TOKEN)

async function runApp() {
  await startMongo()

  bot.use(
    session({
      initial() {
        // return empty object for now
        return {}
      },
    })
  )
  bot.use(responseTime)
  bot.use(setDeveloper)
  bot.use(conversations())
  bot.use(createConversation(greeting))

  // Handle the /start command.
  bot.command('start', (ctx) => {
    if (ctx.config.isDeveloper) {
      ctx.reply('Hi Admin!')
    } else {
      ctx.reply('Welcome! Up and running.')
    }
  })
  bot.command('student', studentHandler)
  bot.command('conversation', async (ctx) => {
    await ctx.conversation.enter('greeting')
  })
  // Handle other messages.
  bot.on('message', (ctx) => ctx.reply('Got another message!'))

  // Now that you specified how to handle messages, you can start your bot.
  // This will connect to the Telegram servers and wait for messages.

  bot.catch(console.error)

  // Start the bot.
  bot.start()
}

void runApp()
