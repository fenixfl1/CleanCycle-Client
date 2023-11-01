import { LOG_DATE_FORMAT } from '@/constants/formats'
import { Formatter } from '@/interfaces/general'
import moment from 'moment'

/**
 * This function is used to format a specific string to a specific formatW
 * @param {string} value - The string to be formatted
 * @param {string} format - The format to be applied
 */
function formatter(props: Formatter) {
  const { value, format, prefix = '' } = props
  const originalValue = prefix ? `${prefix} ${value}` : `${value}`
  if (format) {
    if (format === 'phone') {
      return originalValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
    if (format === 'document') {
      return originalValue.replace(/(\d{3})(\d{7})(\d{1})/, '$1-$2-$3')
    }
    if (format === 'currency') {
      return originalValue.replace(/\B(?=(\d{3})+(?!\d)\.?)/g, ',')
    }
    if (format === 'date') {
      return moment(originalValue).format(LOG_DATE_FORMAT)
    }
  }

  return originalValue
}

export default formatter
