import { Bot, session } from 'grammy'
import startMongo from './helpers/startMongo'
import env from './helpers/env'
import { conversations, createConversation } from '@grammyjs/conversations'
import Context from './models/Context'
import responseTime from './middlewares/responseTime'
import greeting from './conversations/greeting'
import setDeveloper from './middlewares/setDeveloper'
import register from './conversations/register'
import { findStudentById } from './models/Student'
import { startJobs } from './jobs'

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

  // Handle the /start command.
  bot.command('start', (ctx) => {
    if (ctx.config.isDeveloper) {
      ctx.reply('Hi Admin!')
    } else {
      ctx.reply('Welcome! Up and running.')
    }
  })

  bot.command('cancel', async (ctx) => {
    await ctx.conversation.exit()
    await ctx.reply('Диалог успешно прерван.')
  })

  bot.catch(console.error)

  bot.use(createConversation(greeting))
  bot.command('conversation', async (ctx) => {
    await ctx.conversation.enter('greeting')
  })
  bot.use(createConversation(register))
  bot.command('register', async (ctx) => {
    const student = await findStudentById(Number(ctx.from?.id))
    if (!student) {
      await ctx.conversation.enter('register')
    } else {
      await ctx.reply(`Вы уже зарегестрированы.`)
    }
  })

  // Handle other messages.
  bot.on('message', async (ctx) => {
    const student = await findStudentById(Number(env.BOT_DEVELOPER))
    await ctx.reply(`${student}  ${ctx.from.id}`)
  })
  // Start the bot.
  bot.start()
}

void runApp()
