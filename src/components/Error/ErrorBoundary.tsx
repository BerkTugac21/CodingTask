import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  info: ErrorInfo | null;
}

class ErrorBoundary extends Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false, error: null, info: null };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    this.setState({ hasError: true, error, info });
  }

  handleResetError = () => {
    this.setState({ hasError: false, error: null, info: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          <p>{this.state.error?.toString()}</p>
          <pre>{this.state.info?.componentStack}</pre>
          <button onClick={this.handleResetError}>Reset</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
