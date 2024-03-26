import { NextFunction } from 'grammy'
import Context from '../models/Context'
import env from '../helpers/env'

export default async function setDeveloper(ctx: Context, next: NextFunction) {
  ctx.config = {
    botDeveloper: Number(env.BOT_DEVELOPER),
    isDeveloper: ctx.from?.id === Number(env.BOT_DEVELOPER),
  }
  await next()
}
