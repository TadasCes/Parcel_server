import { Document } from "mongoose"
import IUser from "./IUser"

interface IPostTravel extends Document {
  type: number
  canChange: boolean
  cityStart: string
  cityFinish: string
  day?: string
  timeStart?: Date
  timeEnd: Date
  size?: number
  authorId: string
  comment?: string
  urgent?: boolean
  fragile?: boolean
  animal?: boolean
  seenCount?: number
  isActive: boolean
}
export default IPostTravel
