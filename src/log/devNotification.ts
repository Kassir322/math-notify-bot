import Context from '../models/Context'
import { findStudentById } from '../models/Student'

// let jobs = Object.keys(scheduledJobs)

export async function registerNotification(ctx: Context, user_id: number) {
  const student = await findStudentById(user_id)
  if (student) {
    console.log(student)
    const notifyText =
      `Зарегестрирован ученик: ${student.name} ${student.surname}:\n` +
      `user_id: ${student.user_id} \n`
    ctx.api.sendMessage(ctx.config.botDeveloper, notifyText)
  }
}

export async function registerNotificationWithSchedule(
  ctx: Context,
  user_id: number,
  schedule: string
) {
  const student = await findStudentById(user_id)
  if (student) {
    console.log(student)
    const notifyText =
      `Зарегестрирован ученик: ${student.name} ${student.surname}:\n` +
      `user_id: ${student.user_id} \n` +
      `schedule: { ${schedule} }`
    ctx.api.sendMessage(ctx.config.botDeveloper, notifyText)
  }
}

// {
//   _id: new ObjectId('66040acd4c654ec96b222f74'),
//   user_id: 809673990,
//   invitation_code: 'd0648366-3d02-4ed4-bbcf-d3691ea86133',
//   surname: 'фа',
//   name: 'им',
//   __v: 0,
//   createdAt: 2024-03-27T12:02:21.210Z,
//   parent_id: [],
//   updatedAt: 2024-03-27T12:02:21.210Z
// }
