import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { v4 } from 'uuid'

class Traffic {
  @prop({ required: true })
  month!: number
  @prop({ required: true })
  lessons!: (-1 | 0 | 1)[] // -1 неявка; 0 еще не проведено; 1 проведено успешно
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class Student {
  @prop({ required: true, unique: true, index: true })
  user_id!: number
  @prop({ index: true })
  parent_id!: number[]
  @prop({ required: true })
  invitation_code!: string
  @prop({ required: true })
  name!: string
  @prop({ required: true })
  surname!: string
  @prop()
  schedule!: string[]
  @prop()
  traffic!: Traffic[]
}

const StudentModel = getModelForClass(Student)

export function CreateStudent(user_id: number, name: string, surname: string) {
  return StudentModel.findOneAndUpdate(
    {
      user_id,
      name,
      invitation_code: v4(),
      surname,
    },
    {},
    { upsert: true, new: true }
  )
}

export function getSchedules() {
  return StudentModel.find(
    { schedule: { $gt: '' } },
    { schedule: 1, user_id: 1 }
  )
}

export function findStudentById(user_id: number) {
  return StudentModel.findOne({ user_id: user_id }, {})
}
