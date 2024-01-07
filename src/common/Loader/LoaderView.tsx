// Global Components
import * as React from 'react';
import {
  Spinner,
} from 'reactstrap';

// Types
import type {
  $Children,
  $Component,
} from '../../types';

type $OptionalProps = {
  className?: string;
  size?: 'lg' | 'sm';
};

type $Props = $OptionalProps & {
  children: $Children;
  loading: boolean;
};

const LoaderView = function ({
  children,
  className,
  loading,
  size,
}: $Props): $Component<$Props> {
  let sizeClassName = '';
  let style;

  if (size === 'lg') {
    sizeClassName = 'py-5';
    style = {
      height: '3rem',
      width: '3rem',
    };
  }

  return loading === true ? (
    <div className={`d-flex justify-content-center w-100 ${sizeClassName}`}>
      <Spinner
        color="primary"
        style={style}
      />
    </div>
  ) : (
    <div className={`${className || ''} h-100`}>
      {children}
    </div>
  );
};

LoaderView.defaultProps = {
  className: undefined,
  size: undefined,
};

export default LoaderView;
