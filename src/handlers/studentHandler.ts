import { Context } from 'grammy'
import { CreateStudent } from '../models/Student'

export async function studentHandler(ctx: Context) {
  if (!ctx.from) {
    throw new Error('No from field found')
  }
  const student = await CreateStudent(
    809673990,
    [1053884681],
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
}
