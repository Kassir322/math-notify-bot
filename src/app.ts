import { Bot, Context, NextFunction } from 'grammy'
import env from './helpers/env'

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

const bot = new Bot(env.TOKEN)
bot.use(responseTime)

// Handle the /start command.
bot.command('start', (ctx) => ctx.reply('Welcome! Up and running.'))
// Handle other messages.
bot.on('message', (ctx) => ctx.reply('Got another message!'))

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start()
