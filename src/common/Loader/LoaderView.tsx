// Global Components
import * as React from 'react';
import {
  Spinner,
} from 'reactstrap';

// Types
import type {
  $Children,
  $Component,
} from '@vroskus/library-types';

type $OptionalProps = {
  className?: string;
  size?: 'sm' | 'lg';
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
  return loading === true ? (
    <div className={`d-flex justify-content-center w-100 ${size === 'lg' ? 'py-5' : ''}`}>
      <Spinner
        color="primary"
        style={size === 'lg' ? {
          height: '3rem',
          width: '3rem',
        } : {
        }}
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
