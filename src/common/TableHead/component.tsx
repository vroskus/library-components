// Global Components
import * as React from 'react';

// Types
import type {
  $Component,
} from '../../types';

type $Sort = [() => Promise<unknown>, () => Promise<unknown>];

type $Item = {
  className?: string;
  component?: $Component<unknown>;
  name: string;
  sort?: $Sort;
  style?: Record<string, unknown>;
};

type $OptionalProps = {
  iconClasses?: {
    sort: string;
    sortDown: string;
    sortUp: string;
  };
};

type $Props = $OptionalProps & {
  empty: boolean;
  items: Array<$Item>;
};

type $State = {
  activeItemIndex: null | number;
  lock: boolean;
  reverse: boolean;
};

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
    iconClasses: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      activeItemIndex: null,
      lock: false,
      reverse: false,
    };
  }

  setStateAsync(state: Partial<$State>): Promise<void> {
    return new Promise((resolve) => {
      this.setState(
        (pervState: $State) => ({
          ...pervState,
          ...state,
        }),
        resolve,
      );
    });
  }

  async toggle(sort: $Sort, index: number): Promise<void> {
    const {
      activeItemIndex,
      reverse,
    } = this.state;

    await this.setStateAsync({
      lock: true,
    });

    const side: boolean = activeItemIndex === index ? !reverse : false;

    const action = side ? sort[0] : sort[1];

    await action();

    await this.setStateAsync({
      activeItemIndex: index,
      lock: false,
      reverse: side,
    });
  }

  renderIcon(index: number) {
    const {
      iconClasses,
    } = this.props;
    const {
      activeItemIndex,
      reverse,
    } = this.state;

    let iconSortClassName = 'fa fa-sort';
    let iconSortDownClassDown = 'fa fa-sort-down';
    let iconSortUpClassName = 'fa fa-sort-up';

    if (iconClasses) {
      const {
        sort,
        sortDown,
        sortUp,
      } = iconClasses;

      iconSortClassName = sort;
      iconSortDownClassDown = sortDown;
      iconSortUpClassName = sortUp;
    }

    return (activeItemIndex === index ? (
      <em
        className={`${reverse ? iconSortUpClassName : iconSortDownClassDown} text-muted ml-1`}
      />
    ) : (
      <em
        className={`${iconSortClassName} ml-1`}
        style={{
          color: 'lightgrey',
        }}
      />
    ));
  }

  renderSortTh(item: $Item, sort: $Sort, index: number) {
    const {
      lock,
    } = this.state;

    return (
      <th
        className={item.className}
        onClick={() => !lock && this.toggle(
          sort,
          index,
        )}
        role={'button'}
        style={item.style || {
        }}
      >
        {item.name}
        {this.renderIcon(index)}
      </th>
    );
  }

  render() {
    const {
      empty,
      items,
    } = this.props;

    if (empty === true) {
      return (
        <thead className={'TableHead'}>
          <tr>
            <th
              style={{
                height: 37,
              }}
            />
          </tr>
        </thead>
      );
    }

    return (
      <thead className={'TableHead'}>
        <tr>
          {items.map((item: $Item, index: number) => (item.sort ? this.renderSortTh(
            item,
            item.sort,
            index,
          ) : (
            <th
              className={item.className}
              key={item.name}
              style={item.style || {
              }}
            >
              {item.component || item.name}
            </th>
          )))}
        </tr>
      </thead>
    );
  }
}

export default Component;
