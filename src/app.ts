import { Bot, Context, NextFunction } from 'grammy'
import env from './helpers/env'
import { startJobs } from './jobs'
import { findOrCreateStudent } from './models/Student'
import startMongo from './helpers/startMongo'

/** Measures the response time of the bot, and logs it to `console` */
async function responseTime(
  ctx: Context,
  next: NextFunction // is an alias for: () => Promise<void>
): Promise<void> {
  const before = Date.now()
  await next()
  const after = Date.now()
  console.log(`Response time: ${after - before} ms`)
}

export const bot = new Bot(env.TOKEN)

async function runApp() {
  await startMongo()

  bot.use(responseTime)

  // Handle the /start command.
  bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))
  bot.command('student', async (ctx) => {
    if (!ctx.from) {
      throw new Error('No from field found')
    }
    const student = await findOrCreateStudent(
      809673990,
      1053884681,
      'Дима',
      'Сенцов',
      ['0 14 23 * * *', '0 15 23 * * *'],
      [
        {
          month: 4,
          lessons: [1, 1, -1, -1],
        },
      ]
    )
    if (!student) {
      throw new Error('Student not found')
    } else {
      console.log('created')
    }
  })
  // Handle other messages.
  bot.on('message', (ctx) => ctx.reply('Got another message!'))

  // Now that you specified how to handle messages, you can start your bot.
  // This will connect to the Telegram servers and wait for messages.

  bot.catch(console.error)

  // Start the bot.
  bot.start()
  startJobs()
}

void runApp()
