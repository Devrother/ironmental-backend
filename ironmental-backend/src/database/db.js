import mongoose from 'mongoose'

const {
  MONGODB_HOST,
  MONGODB_PW,
  MONGODB_IP,
  MONGODB_PORT,
  MONGODB_NAME
} = process.env

export default {
  connect: () => {
    mongoose.connect(
        `mongodb://${MONGODB_HOST}:${MONGODB_PW}@${MONGODB_IP}:${MONGODB_PORT}/${MONGODB_NAME}`,
        { useNewUrlParser: true, useFindAndModify: false }
    ).catch(console.log)
  },
}

// ${process.env.DB}