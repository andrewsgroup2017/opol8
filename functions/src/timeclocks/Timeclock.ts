import { GeoPoint } from '@google-cloud/firestore'
import { Url } from 'url'

class TimeClock {
  id: string
  employee_id: string
  dept: string
  status: string
  created: string
  in_timestamp: string
  out_timestamp: string
  approved_by: string
  approved_time: string
  approved_notes: string
  in_picture?: Url
  out_picture: string
  screenshots?: any
  break_time: string
  start_timestamp: string
  end_timestamp: string
  in_picture_url?: any
  out_picture_url?: any
  in_gps: GeoPoint
  out_gps: GeoPoint
  in_deviceId: string
  out_deviceId: string
  in_print: string
  out_print: string
  event: string
  events = []

  addEvent(x) {
    this.events.push(x)
  }

  getCurrentTime(x) {
    //send back calc
  }

  constructor(id: string) {
    this.id = id
  }
}
