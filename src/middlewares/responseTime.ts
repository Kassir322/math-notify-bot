import { NextFunction } from 'grammy'
import Context from '../models/Context'

export default async function responseTime(
  ctx: Context,
  next: NextFunction // is an alias for: () => Promise<void>
): Promise<void> {
  const before = Date.now()
  await next()
  const after = Date.now()
  console.log(`Response time: ${after - before} ms`)
}
