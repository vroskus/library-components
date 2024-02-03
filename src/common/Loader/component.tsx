// Global Components
import * as React from 'react';
import {
  Spinner,
} from 'reactstrap';

// Types
import type {
  $Children,
} from '../../types';

type $OptionalProps = {
  className?: string;
  overlay?: boolean;
  size?: 'lg' | 'sm';
};

type $Props = $OptionalProps & {
  children: $Children;
  loading: boolean;
};

class Component extends React.Component<$Props> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    overlay: undefined,
    size: undefined,
  };

  renderSpinner(className: string) {
    const {
      size,
    } = this.props;

    let sizeClassName = '';
    let style;

    if (size === 'lg') {
      sizeClassName = 'py-5';
      style = {
        height: '3rem',
        width: '3rem',
      };
    }

    return (
      <div className={`d-flex justify-content-center w-100 ${sizeClassName} ${className}`}>
        <Spinner
          color="primary"
          style={style}
        />
      </div>
    );
  }

  renderOverlay(componentClassName: string) {
    const {
      children,
      loading,
    } = this.props;

    const style = {
      backgroundColor: loading === true ? 'rgba(255, 255, 255, 0.5)' : 'transparent',
    };

    return (
      <div
        className={`${componentClassName} ${loading === true ? 'position-relative' : ''}`}
        style={style}
      >
        {children}
        {loading === true && this.renderSpinner('position-absolute top-50 start-50 translate-middle')}
      </div>
    );
  }

  renderReplace(componentClassName: string) {
    const {
      children,
      loading,
    } = this.props;

    return (loading === true ? (
      <div className={componentClassName}>
        {this.renderSpinner('')}
      </div>
    ) : children);
  }

  render() {
    const {
      className,
      overlay,
    } = this.props;

    const componentClassName: string = `Loader h-100 ${className || ''}`;

    return overlay === true
      ? this.renderOverlay(componentClassName)
      : this.renderReplace(componentClassName);
  }
}

export default Component;
