import { Document } from "mongoose"
import IUser from "./IUser"

interface IParcel extends Document {
  cityStart: string
  cityFinish: string
  timeStart?: Date
  timeEnd: Date
  size?: number
  authorId: string
  comment?: string
  urget?: boolean
  fragile?: boolean
  animal?: boolean
}

export default IParcel
