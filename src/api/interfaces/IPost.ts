import { Document } from "mongoose"
import IUser from "./IUser"

interface IPostTravel extends Document {
  type: number
  cityStart: string
  cityFinish: string
  timeStart?: Date
  timeEnd: Date
  size?: number
  author: {
    id: string
    firstName: string
    lastName: string
    phone: string
    rating: number
    countDelivered: number
  }
}

export default IPostTravel
