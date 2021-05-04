import { Document } from "mongoose"
import IUser from "./IUser"

interface IPostTravel extends Document {
  type: number
  cityStart: string
  cityFinish: string
  timeStart?: Date
  timeEnd: Date
  size?: number
  authorId: string
}

export default IPostTravel
