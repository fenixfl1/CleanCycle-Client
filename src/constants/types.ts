export type Theme = 'light' | 'dark'

export type TriggersType = {
  onBlur?: unknown
  onChange?: unknown
  onClick?: unknown
  onFinish?: unknown
  onFocus?: unknown
  onPress?: unknown
  onPressEnter?: unknown
  onReset?: unknown
  onSearch?: unknown
  onSelect?: unknown
  onSubmit?: unknown
  onTab?: unknown
}

export type Format = 'phone' | 'document' | 'currency' | 'date'

export type Location = {
  lat: number
  lng: number
}

export type NotificationType = 'success' | 'info' | 'warning' | 'error'
