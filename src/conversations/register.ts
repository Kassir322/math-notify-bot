import { Conversation } from '@grammyjs/conversations'
import Context from '../models/Context'
import { v4 } from 'uuid'

export default async function register(
  conversation: Conversation<Context>,
  ctx: Context
) {
  await ctx.reply('TODO: информация о преподе')
  await ctx.reply(
    'Если вы ошибетесь при заполнении ответов, можете воспользоваться командой <code>/cancel</code>\n\n' +
      'Вы родитель или ученик?',
    { parse_mode: 'HTML' }
  )

  const { message } = await conversation.wait()
  if (message?.text?.toLowerCase() === 'родитель') {
    await parent(conversation, ctx)
  } else if (message?.text?.toLowerCase() === 'ученик') {
    await ctx.reply(`Вы ученик!`)
  } else {
    await ctx.reply(`Ошибка! Сообщение не найдено.`)
  }
}

async function parent(conversation: Conversation<Context>, ctx: Context) {
  await ctx.reply('Напишите ваше ФИО.')
  const name = (await conversation.wait()).message
  if (name) {
    // await ctx.reply(`Вас зовут ${name}!`)
    await ctx.reply(`${v4()}`)
  } else {
    await ctx.reply(`Ошибка! Сообщение не найдено.`)
  }
}
