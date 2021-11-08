import * as Mongoose from 'mongoose'
import { IDatabaseConnection } from './IDatabaseConnection'
import { WinstonLogger } from '../common/logger/WinstonLogger'

export class DatabaseConnection implements IDatabaseConnection {
  public connect(): void {
    const logger = new WinstonLogger()
    try {
      const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@chatappcluster.wbbx5.mongodb.net/ChatAppCluster?retryWrites=true&w=majority`

      Mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      const connection = Mongoose.connection

      connection.on('open', () => {
        logger.info(`Database connected successfully`)
      })
      connection.on('error', error => {
        logger.error('Error connecting database:', error)
      })
    } catch (error) {
      console.error(error)
    }
  }
}
