import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'

class Traffic {
  @prop({ required: true })
  month!: number
  @prop({ required: true })
  lessons!: (-1 | 0 | 1)[] // -1 неявка; 0 еще не проведено; 1 проведено успешно
}

// const traffic: Traffic = {
//   month: 4,
//   lessons: [1, 1, -1, 0],
// }

@modelOptions({ schemaOptions: { timestamps: true } })
export class Student {
  @prop({ required: true, unique: true, index: true })
  user_id!: number
  @prop({ required: true, index: true })
  parent_id!: number
  @prop({ required: true })
  name!: string
  @prop({ required: true })
  surname!: string
  @prop({ required: true })
  schedule!: string[]
  @prop({ required: true })
  trafficTEST!: Traffic[]
}

const StudentModel = getModelForClass(Student)

export function findOrCreateStudent(
  user_id: number,
  parent_id: number,
  name: string,
  surname: string,
  schedule: string[],
  trafficTEST: Traffic[]
) {
  return StudentModel.findOneAndUpdate(
    {
      user_id,
      parent_id,
      name,
      surname,
      schedule,
      trafficTEST,
    },
    {},
    { upsert: true, new: true }
  )
}
