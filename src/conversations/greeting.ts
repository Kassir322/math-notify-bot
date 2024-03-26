import { Conversation } from '@grammyjs/conversations'
import Context from '../models/Context'

export default async function greeting(
  conversation: Conversation<Context>,
  ctx: Context
) {
  await ctx.reply('Hi there! What is your name?')
  const { message } = await conversation.wait()
  if (message) {
    await ctx.reply(`Welcome to the chat, ${message.text}!`)
  } else {
    await ctx.reply(`Message not found!`)
  }
}
