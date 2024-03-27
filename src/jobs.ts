import { scheduleJob } from 'node-schedule'
import { bot } from './app'
import { getSchedules } from './models/Student'

export const startJobs = async () => {
  const data = await getSchedules()
  if (!data) {
    throw new Error('Schedules not found')
  } else {
    data.map((student) => {
      student.schedule?.map((schedule, index) => {
        scheduleJob(`${student.user_id}_${index}`, schedule, () => {
          bot.api.sendMessage(student.user_id, 'Напоминание')
        })
      })
    })
  }
}
