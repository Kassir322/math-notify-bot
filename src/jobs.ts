import { scheduleJob } from 'node-schedule'
import { bot } from './app'

const jobsArray: {
  username: string
  schedule: string
  user_id: number
}[] = [
  {
    username: 'Dima',
    schedule: '0 20 22 * * 7',
    user_id: 809673990,
  },
  // {
  //   username: 'Sanya',
  //   schedule: '50 * * * * *',
  //   user_id: 1053884681,
  // },
]

export const startJobs = () => {
  jobsArray.map((job) =>
    scheduleJob(job.username, job.schedule, () => {
      const date = new Date()
      const message_text = `${job.username}:   ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      console.log(message_text)
      bot.api.sendMessage(job.user_id, message_text)
    })
  )
}

// let jobs = Object.keys(scheduledJobs)
