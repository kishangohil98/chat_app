import * as Mongoose from 'mongoose'

let database: Mongoose.Connection
export const connect = () => {
  // add your own uri below
  const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@chatappcluster.wbbx5.mongodb.net/ChatAppCluster?retryWrites=true&w=majority`
  if (database) {
    return
  }
  Mongoose.connect(uri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  database = Mongoose.connection
  database.once('open', async () => {
    console.log('Connected to database')
  })
  database.on('error', () => {
    console.log('Error connecting to database')
  })
}

export const disconnect = () => {
  if (!database) {
    return
  }
  Mongoose.disconnect()
}
