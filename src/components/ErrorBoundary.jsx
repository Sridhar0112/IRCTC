import React from 'react';
import { logger } from '../services/logger';
import GlobalErrorPage from '../pages/system/GlobalErrorPage';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logger.error('React ErrorBoundary captured', { error: error?.message, stack: errorInfo?.componentStack });
  }

  render() {
    if (this.state.hasError) return <GlobalErrorPage />;
    return this.props.children;
  }
}
