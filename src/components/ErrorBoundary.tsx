import React from 'react'
import CustomResult from './antd/CustomResult'

interface Props {
  children: React.ReactNode
}

interface StateProps {
  hasError: boolean
  error: string | Record<string, unknown>
  errorInfo: string | Record<string, unknown>
}

export class ErrorBoundary extends React.Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: '', errorInfo: '' }
  }

  static getDerivedStateFromError(): Partial<StateProps> {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error?.message,
      errorInfo: errorInfo?.componentStack ?? '',
    })
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <CustomResult
          subTitle={this.state.errorInfo as string}
          status={'error'}
          title={this.state.error as string}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
