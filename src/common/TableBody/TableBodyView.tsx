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
  loadingLinesQuantity?: number;
};

type $Props = $OptionalProps & {
  children: $Children;
  empty: boolean;
  labelEmptyList: string;
  loading: boolean;
};

const loadingLines = (qty: number) => ([...Array(qty || 15)].map((e, i) => (
  <tr key={`row_${String(i)}`}>
    <td colSpan={100}>
      <div className="TableBody-empty" />
    </td>
  </tr>
)));

const TableBodyView = function ({
  appending,
  children,
  className,
  empty,
  labelEmptyList,
  loading,
  loadingLinesQuantity,
}: $Props): $Component<$Props> {
  if (loading === true) {
    return (
      <tbody className="TableBody">
        {loadingLines(loadingLinesQuantity)}
      </tbody>
    );
  }

  if (empty === true) {
    return (
      <tbody className="TableBody">
        <tr>
          <td colSpan={100}>
            <div className="text-muted text-center p-3">
              {labelEmptyList}
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody className={`TableBody ${className || ''}`}>
      {children}
      {appending && loadingLines(loadingLinesQuantity)}
    </tbody>
  );
};

TableBodyView.defaultProps = {
  appending: undefined,
  className: undefined,
  loadingLinesQuantity: undefined,
};

export default TableBodyView;
