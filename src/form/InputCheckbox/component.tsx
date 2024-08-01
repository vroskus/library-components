// Global Components
import * as React from 'react';
import {
  AvInput,
} from 'availity-reactstrap-validation';

// Helpers
import _ from 'lodash';

// Types
import type {
  $Component,
} from '../../types';

type $OptionalProps = {
  className?: string;
  description?: null | string;
  iconClass?: string;
  label?: $Component<unknown> | string;
  onChange?: (value: boolean | null) => unknown;
  stringify?: boolean;
  value?: boolean | null;
};

type $Props = $OptionalProps & {
  name: string;
};

type $State = {
  value: boolean | null;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    description: undefined,
    iconClass: undefined,
    label: undefined,
    onChange: undefined,
    stringify: undefined,
    value: undefined,
  };

  onChange: (value: boolean) => unknown;

  constructor(props: $Props) {
    super(props);

    this.state = {
      value: props.value || null,
    };

    this.onChange = props.onChange ? _.debounce(
      props.onChange,
      1000,
    ) : () => {};
  }

  componentDidUpdate(prevProps: $Props) {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value: value || null,
      });
    }
  }

  renderLabel() {
    const {
      description,
      label,
    } = this.props;

    return (
      <p className="mb-0">
        {label}
        {description && (
          <>
            <br />
            <small className="d-block text-muted lh-1">
              {description}
            </small>
          </>
        )}
      </p>
    );
  }

  renderInput(id: string) {
    const {
      iconClass,
      name,
      stringify,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <>
        <AvInput
          id={id}
          name={stringify === true ? `_${name}` : name}
          onClick={() => {
            const newValue = value === null ? true : !value;

            this.onChange(newValue);
            this.setState({
              value: newValue,
            });
          }}
          type="checkbox"
          value={value}
        />
        <span className={iconClass || 'fa fa-check'} />
      </>
    );
  }

  render() {
    const {
      className,
      name,
      stringify,
    } = this.props;
    const {
      value,
    } = this.state;

    const id = `Checkbox-${name}`;

    return (
      <div className={`InputCheckbox checkbox c-checkbox mb-3 ${className || ''}`}>
        <label
          className="d-flex justify-content-start align-items-center mb-1"
          htmlFor={id}
        >
          {this.renderInput(id)}
          {this.renderLabel()}
        </label>
        {stringify === true && (
          <AvInput
            name={name}
            style={{
              display: 'none',
            }}
            value={value !== null ? JSON.stringify(value) : undefined}
          />
        )}
      </div>
    );
  }
}

export default Component;
