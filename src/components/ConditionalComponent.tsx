import React, { cloneElement } from 'react'
import { TriggersType } from '../constants/types'
import { CustomModalError } from './antd/ModalMethods'

type Triggers = {
  [key in keyof TriggersType]: (e: any) => void
}

interface ConditionalComponentProps extends Triggers {
  condition: boolean
  children: React.ReactNode
  showAlways?: boolean
  trigger?: keyof TriggersType
  message?: string
  fallback?: React.ReactNode
}

const ConditionalComponent: React.FC<ConditionalComponentProps> = ({
  condition,
  showAlways = false,
  trigger = 'onClick',
  message,
  fallback,
  ...props
}) => {
  const handleTrigger = (e: Event) => {
    e.preventDefault?.()
    if (condition) {
      if (React.isValidElement(props.children)) {
        props?.children?.props?.[trigger]?.(e)
      }
      ;(props as any)?.[trigger]?.(e)
    } else if (showAlways && message) {
      CustomModalError({
        title: 'Error',
        content: message,
      })
    }
  }

  const element = condition
    ? cloneElement(props.children as any, {
        [trigger]: handleTrigger,
      })
    : showAlways && !condition
    ? cloneElement(props.children as any, {
        [trigger]: handleTrigger,
      })
    : fallback

  return element as React.ReactElement
}

export default ConditionalComponent
