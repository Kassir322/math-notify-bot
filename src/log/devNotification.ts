import Context from '../models/Context'
import { findStudentById } from '../models/Student'

// let jobs = Object.keys(scheduledJobs)

export async function registerNotification(ctx: Context, user_id: number) {
  const student = await findStudentById(user_id)
  if (student) {
    console.log(student)

    const notifyText = `Зарегестрирован ученик: ${Object.keys(student)}`
    ctx.api.sendMessage(ctx.config.botDeveloper, notifyText)
  }
}
