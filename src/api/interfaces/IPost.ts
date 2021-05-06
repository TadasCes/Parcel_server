import { Document } from "mongoose"
import IUser from "./IUser"

interface IPostTravel extends Document {
  type: number
  canChange: boolean
  cityStart: string
  cityFinish: string
  timeStart?: Date
  timeEnd: Date
  size?: number
  authorId: string
  comment?: string
}

export default IPostTravel
