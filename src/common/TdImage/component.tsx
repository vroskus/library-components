// Global Components
import * as React from 'react';

// Helpers
import ModalImage from 'react-modal-image';

// Types
import type {
  $Component,
} from '../../types';

type $Props = {
  largeImageUrl: string;
  noImageUrl: string;
  smallImageUrl: string;
  value?: null | string;
};

const Component = function ({
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
            className="img-fluid"
            large={largeImageUrl}
            small={smallImageUrl}
          />
        ) : (
          <div>
            <img
              alt=""
              src={noImageUrl}
            />
          </div>
        )}
      </div>
    </td>
  );
};

Component.defaultProps = {
  value: undefined,
};

export default Component;
