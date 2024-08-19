// Global Components
import * as React from 'react';
import {
  CardBody,
} from 'reactstrap';

// Components
import TitleSubtitle from '../TitleSubtitle';

// Types
import type {
  $Component,
} from '../../types';

type $OptionalProps = {
  bottomBorder?: boolean;
  className?: boolean;
  description?: string;
  iconClass?: string;
  rightButtons?: $Component<unknown>;
  titleButton?: $Component<unknown>;
};

type $Props = $OptionalProps & {
  title: string;
};

const Component = function ({
  bottomBorder,
  className,
  description,
  iconClass,
  rightButtons,
  title,
  titleButton,
}: $Props): $Component<$Props> {
  return (
    <CardBody className={`SectionHeader ${className || ''} ${bottomBorder ? 'border-thin-bottom' : ''} py-2`}>
      <div className={'d-flex flex-row'}>
        <div className={'d-flex flex-grow-1 align-items-center'}>
          <span>
            {titleButton}
          </span>
          {iconClass && (
            <em className={`${iconClass} mr-2`} />
          )}
          <div>
            <TitleSubtitle
              subTitle={description}
              title={title}
            />
          </div>
        </div>
        {rightButtons && (
          <div className={'d-flex flex-grow-0 pl-3'}>
            {rightButtons}
          </div>
        )}
      </div>
    </CardBody>
  );
};

Component.defaultProps = {
  bottomBorder: undefined,
  className: undefined,
  description: undefined,
  iconClass: undefined,
  rightButtons: undefined,
  titleButton: undefined,
};

export default Component;
