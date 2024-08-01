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

type $Props = {
  empty: boolean;
  items: Array<$Item>;
};

type $State = {
  activeItemIndex: null | number;
  lock: boolean;
  reverse: boolean;
};

class Component extends React.Component<$Props, $State> {
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

  renderSortTh(item: $Item, sort: $Sort, index: number) {
    const {
      activeItemIndex,
      lock,
      reverse,
    } = this.state;

    return (
      <th
        className={item.className}
        onClick={() => !lock && this.toggle(
          sort,
          index,
        )}
        role="button"
        style={item.style || {
        }}
      >
        {item.name}
        {activeItemIndex === index ? (
          <em className={`ml-1 text-muted ${reverse ? 'fa fa-sort-up' : 'fa fa-sort-down'}`} />
        ) : (
          <em
            className="ml-1 fa fa-sort"
            style={{
              color: 'lightgrey',
            }}
          />
        )}
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
        <thead className="TableHead">
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
      <thead className="TableHead">
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
