import * as Mongoose from 'mongoose'
import { IDatabaseConnection } from './IDatabaseConnection'

export class DatabaseConnection implements IDatabaseConnection {
  public connect(): void {
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
        console.log('Database connected....')
      })
      connection.on('error', error => {
        console.error(error)
      })
    } catch (error) {
      console.error(error)
      // throw new ForbiddenException('Database connection failed');
    }
  }
}
