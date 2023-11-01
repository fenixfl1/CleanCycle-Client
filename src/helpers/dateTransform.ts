import { LOG_DATE_FORMAT } from '@/constants/formats'
import moment from 'moment'

export const dateTransform = (
  date: string,
  format = LOG_DATE_FORMAT,
): string => {
  return moment(date).format(format)
}
