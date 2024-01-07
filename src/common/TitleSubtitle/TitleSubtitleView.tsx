// Global Components
import * as React from 'react';

// Types
import type {
  $Component,
} from '../../types';

type $OptionalProps = {
  subTitle?: string;
};

type $Props = $OptionalProps & {
  title: string;
};

const TitleSubtitleView = function ({
  subTitle,
  title,
}: $Props): $Component<$Props> {
  return (
    <>
      <h4 className="mb-0">
        {title}
      </h4>
      {subTitle && (
        <small className="d-block text-muted lh-1 mt-1">
          {subTitle}
        </small>
      )}
    </>
  );
};

TitleSubtitleView.defaultProps = {
  subTitle: undefined,
};

export default TitleSubtitleView;
