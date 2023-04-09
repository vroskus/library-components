// Global Components
import * as React from 'react';
import {
  CardBody,
} from 'reactstrap';

// Types
import type {
  $Component,
} from '@vroskus/library-types';

type $OptionalProps = {
  bottomBorder?: boolean;
  description?: string;
  iconClass?: string;
  rightButtons?: $Component<unknown>;
  titleButton?: $Component<unknown>;
};

type $Props = $OptionalProps & {
  title: string;
};

const SectionHeaderView = function ({
  bottomBorder,
  description,
  iconClass,
  rightButtons,
  title,
  titleButton,
}: $Props): $Component<$Props> {
  return (
    <CardBody className={`${bottomBorder ? 'border-thin-bottom' : ''} py-2`}>
      <div className="d-flex flex-row">
        <div className="d-flex flex-grow-1 align-items-center">
          <span>
            {titleButton}
          </span>
          {iconClass && <em className={`fa ${iconClass} mr-2`} />}
          <div>
            <h4 className="mb-0">
              {title}
            </h4>
            {description && (
            <small className="d-block text-muted lh-1 mt-1">
              {description}
            </small>
            )}
          </div>
        </div>
        {rightButtons && (
        <div className="d-flex flex-grow-0 pl-3">
          {rightButtons}
        </div>
        )}
      </div>
    </CardBody>
  );
};

SectionHeaderView.defaultProps = {
  bottomBorder: undefined,
  description: undefined,
  iconClass: undefined,
  rightButtons: undefined,
  titleButton: undefined,
};

export default SectionHeaderView;
