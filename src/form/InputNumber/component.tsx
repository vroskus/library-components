// Global Components
import * as React from 'react';
import {
  FormGroup,
  Label,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';

// Types
type $OptionalProps = {
  className?: string;
  disabled?: boolean;
  label?: string;
  max?: number;
  min?: number;
  onChange?: (value: null | number) => unknown;
  placeholder?: string;
  required?: boolean;
  value?: null | number;
};

type $Props = $OptionalProps & {
  name: string;
};

type $State = {
  numberValue: null | number;
  stringValue: null | string;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    disabled: undefined,
    label: undefined,
    max: undefined,
    min: undefined,
    onChange: undefined,
    placeholder: undefined,
    required: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    const {
      value,
    } = props;

    let stringValue = null;
    let numberValue = null;

    if (typeof value !== 'undefined' && value !== null) {
      stringValue = String(value);
      numberValue = value;
    }

    this.state = {
      numberValue,
      stringValue,
    };
  }

  componentDidUpdate(prevProps: $Props): void {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setValue(value !== null ? String(value) : null);
    }
  }

  setValue(value: null | string): void {
    const {
      onChange,
    } = this.props;

    let stringValue = null;
    let numberValue = null;

    if (value !== '' && value !== null) {
      stringValue = value;
      numberValue = Number(value);
    }

    this.setState({
      numberValue,
      stringValue,
    });

    if (onChange) {
      onChange(numberValue);
    }
  }

  render() {
    const {
      className,
      disabled,
      label,
      max,
      min,
      name,
      placeholder,
      required,
    } = this.props;
    const {
      numberValue,
      stringValue,
    } = this.state;

    return (
      <FormGroup className={`InputNumber ${className || ''}`}>
        {label && (
          <Label>
            {label}
          </Label>
        )}
        <AvInput
          disabled={disabled}
          max={max}
          min={min}
          name={`_${name}`}
          onChange={(e) => this.setValue(e.target.value)}
          placeholder={placeholder}
          required={required}
          type="number"
          value={stringValue}
        />
        <AvInput
          name={name}
          style={{
            display: 'none',
          }}
          value={numberValue}
        />
      </FormGroup>
    );
  }
}

export default Component;
