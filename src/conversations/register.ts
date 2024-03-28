import { Conversation } from '@grammyjs/conversations'
import Context from '../models/Context'
import { v4 } from 'uuid'
import { CreateStudent } from '../models/Student'
import {
  registerNotification,
  registerNotificationWithSchedule,
} from '../log/devNotification'

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
    await studentConversation(conversation, ctx)
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

async function studentConversation(
  conversation: Conversation<Context>,
  ctx: Context
) {
  await ctx.reply('Как тебя зовут? Напиши фамилию и имя.')
  const name = (await conversation.waitFor('message:text')).message

  // console.log(
  //   `Created student ${JSON.stringify({
  //     user_id: Number(message.from.id),
  //     surname: message.text.split(' ')[0],
  //     name: message.text.split(' ')[1],
  //   })}`
  // )

  await ctx.reply(
    `Привет, ${name.text.split(' ')[1]}!\n` +
      'Вы уже договорились с преподавателем о расписании? (да/нет)'
  )
  const isSchedule = (await conversation.waitFor('message:text')).message
  let schedule: string = ''
  if (isSchedule.text.toLocaleLowerCase() === 'да') {
    await ctx.reply(
      `Напиши дни недели и время занятия. Пример:\n\n` +
        `Понедельник 18:00\nПятница 20:00`
    )
    schedule = (
      await conversation.waitFor('message:text')
    ).message.text.toString()
  } else if (isSchedule.text.toLocaleLowerCase() === 'нет') {
    await ctx.reply(
      `Отправил запрос преподавателю, ожидай ответа. Он продолжит регистрацию.`
    )
  }
  if (!schedule) {
    const student = await CreateStudent(
      Number(name.from.id),
      name.text.split(' ')[1],
      name.text.split(' ')[0]
    )
    if (student) {
      registerNotification(ctx, Number(name.from.id))
    } else {
      throw new Error('Student not created')
    }
  } else {
    const student = await CreateStudent(
      Number(name.from.id),
      name.text.split(' ')[1],
      name.text.split(' ')[0]
    )
    if (student) {
      registerNotificationWithSchedule(ctx, Number(name.from.id), schedule)
    } else {
      throw new Error('Student not created')
    }
  }
}
