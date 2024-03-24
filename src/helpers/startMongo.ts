import { connect } from 'mongoose'
import env from './env'

function startMongo() {
  return connect(env.MONGO)
}

export default startMongo
