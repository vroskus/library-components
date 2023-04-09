// Global Components
import * as React from 'react';

// Helpers
import ModalImage from 'react-modal-image';

// Types
import type {
  $Component,
} from '@vroskus/library-types';

type $Props = {
  largeImageUrl: string;
  noImageUrl: string;
  smallImageUrl: string;
  value?: string | null;
};

const TdImageView = function ({
  largeImageUrl,
  noImageUrl,
  smallImageUrl,
  value,
}: $Props): $Component<$Props> {
  return (
    <td
      className="TdImage py-0"
      style={{
        width: 64,
      }}
    >
      <div className="d-flex align-items-center">
        {value ? (
          <ModalImage
            small={smallImageUrl}
            large={largeImageUrl}
            className="img-fluid"
          />
        ) : (
          <div>
            <img
              src={noImageUrl}
              alt=""
            />
          </div>
        )}
      </div>
    </td>
  );
};

TdImageView.defaultProps = {
  value: undefined,
};

export default TdImageView;
