import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { v4 } from 'uuid'

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
  parent_id!: number[]
  @prop({ required: true })
  invitation_code!: number
  @prop({ required: true })
  name!: string
  @prop({ required: true })
  surname!: string
  @prop({ required: true })
  schedule!: string[]
  @prop({ required: true })
  traffic!: Traffic[]

  // public static async findByUserId(
  //   this: ReturnModelType<typeof Student>,
  //   user_id: number
  // ) {
  //   return this.find({ user_id }).exec()
  // }
}

const StudentModel = getModelForClass(Student)

export function CreateStudent(
  user_id: number,
  parent_id: number[],
  name: string,
  surname: string,
  schedule: string[],
  traffic: Traffic[]
) {
  return StudentModel.findOneAndUpdate(
    {
      user_id,
      parent_id,
      name,
      invitation_code: v4(),
      surname,
      schedule,
      traffic,
    },
    {},
    { upsert: true, new: true }
  )
}

export function getSchedules() {
  return StudentModel.find({}, { schedule: 1, user_id: 1 })
}

export function findStudentById(user_id: number) {
  return StudentModel.findOne({ user_id }, {})
}
