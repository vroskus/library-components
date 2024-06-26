// Global Components
import * as React from 'react';

// Types
import type {
  $Children,
  $Component,
} from '../../types';

type $OptionalProps = {
  appending?: boolean;
  className?: number;
  empty?: boolean;
  loading?: boolean;
  loadingLinesQuantity?: number;
};

type $Props = $OptionalProps & {
  children: $Children;
  labelEmptyList: string;
};

const LoadingLines = function ({
  qty,
}: {
  qty?: number;
}) {
  return ([...Array(qty || 15)].map((e, i) => (
    <tr key={`row_${String(i)}`}>
      <td colSpan={100}>
        <div className="TableBody-empty" />
      </td>
    </tr>
  )));
};

const Empty = function ({
  labelEmptyList,
}: {
  labelEmptyList: string;
}) {
  return (
    <tr>
      <td colSpan={100}>
        <div className="text-muted text-center p-3">
          {labelEmptyList}
        </div>
      </td>
    </tr>
  );
};

const Content = function ({
  children,
  empty,
  labelEmptyList,
}: {
  children: $Children;
  empty: boolean;
  labelEmptyList: string;
}) {
  return (empty === true ? (
    <Empty labelEmptyList={labelEmptyList} />
  ) : children);
};

const Component = function ({
  appending,
  children,
  className,
  empty,
  labelEmptyList,
  loading,
  loadingLinesQuantity,
}: $Props): $Component<$Props> {
  return (
    <tbody className={`TableBody ${className || ''}`}>
      {loading === true ? (
        <LoadingLines
          qty={loadingLinesQuantity}
        />
      ) : (
        <>
          <Content
            empty={empty === true && !appending}
            labelEmptyList={labelEmptyList}
          >
            {children}
          </Content>
          {appending === true && (
            <LoadingLines
              qty={loadingLinesQuantity}
            />
          )}
        </>
      )}
    </tbody>
  );
};

Component.defaultProps = {
  appending: undefined,
  className: undefined,
  empty: undefined,
  loading: undefined,
  loadingLinesQuantity: undefined,
};

export default Component;
