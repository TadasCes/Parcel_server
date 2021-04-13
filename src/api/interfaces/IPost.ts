import { Document } from "mongoose"
import IUser from "./IUser"

interface IPost extends Document {
  cityStart: string
  cityFinish: string
  timeStart: Date
  timeEnd: Date
  author: {
    id: string
    firstName: string
    lastName: string
    rating: number
    countDelivered: number
  }
}

export default IPost
