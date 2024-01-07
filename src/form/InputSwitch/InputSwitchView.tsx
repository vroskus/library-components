// Global Components
import * as React from 'react';

import {
  AvInput,
} from 'availity-reactstrap-validation';

// Types
type $OptionalProps = {
  className?: string,
  disabled?: boolean;
  label?: string;
  onChange?: (value: boolean) => unknown;
  size?: 'lg' | 'md' | 'sm',
  value?: boolean;
};

type $Props = $OptionalProps & {
  name: string;
};

type $State = {
  value: boolean;
};

class InputSwitchView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    disabled: undefined,
    label: undefined,
    onChange: undefined,
    size: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      value: props.value || false,
    };
  }

  componentDidUpdate(prevProps: $Props) {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value: value || false,
      });
    }
  }

  render() {
    const {
      className,
      disabled,
      label,
      name,
      onChange,
      size,
    } = this.props;
    const {
      value,
    } = this.state;

    const id = `InputSwitch-${name}`;

    return (
      <>
        <div className={`InputSwitch form-check form-switch form-switch-${size || 'md'} ${className || ''}`}>
          <input
            checked={value}
            className="form-check-input"
            disabled={disabled}
            id={id}
            onChange={() => this.setState(
              {
                value: !value,
              },
              () => onChange && onChange(!value),
            )}
            role="switch"
            type="checkbox"
          />
          {label && (
            <label
              className="form-check-label"
              htmlFor={id}
            >
              {label}
            </label>
          )}
        </div>
        <AvInput
          checked={value}
          disabled={disabled}
          name={name}
          style={{
            display: 'none',
          }}
          type="checkbox"
          value={value}
        />
      </>
    );
  }
}

export default InputSwitchView;
