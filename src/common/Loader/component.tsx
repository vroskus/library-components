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

  renderSpinner() {
    const {
      size,
    } = this.props;

    let sizeClassName = 'py-3';
    let style = {
      height: '3rem',
      width: '3rem',
    };

    if (size === 'sm') {
      sizeClassName = 'py-0';
      style = {
        height: '2rem',
        width: '2rem',
      };
    }

    return (
      <div
        className={`Loader-spinner d-flex align-items-center justify-content-center w-100 ${sizeClassName}`}
      >
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
      >
        {children}
        {loading === true && (
          <div
            className="Loader-overlay d-flex align-items-center position-absolute top-0 left-0 right-0 bottom-0 w-100"
            style={style}
          >
            {this.renderSpinner()}
          </div>
        )}
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
        {this.renderSpinner()}
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
