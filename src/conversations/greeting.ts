import { Conversation } from '@grammyjs/conversations'
import Context from '../models/Context'

export default async function greeting(
  conversation: Conversation<Context>,
  ctx: Context
) {
  await ctx.reply('Hi there! What is your name?')
  const message1 = await (await conversation.wait()).message
  if (message1) {
    await ctx.reply(`Welcome to the chat, ${message1.text}!`)
  } else {
    await ctx.reply(`Message not found!`)
  }
  // await ctx.reply('Второе?')

  // const message2 = (await conversation.wait()).message
  // if (message2) {
  //   await ctx.reply(`Welcome to the chat, ${message2.text}!`)
  // } else {
  //   await ctx.reply(`Message not found!`)
  // }
}
