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
  label?: string;
  placeholder?: string;
  value?: number | null;
  required?: boolean;
  disabled?: boolean;
  onChange?: (value: number | null) => unknown;
  min?: number;
  max?: number;
};

type $Props = $OptionalProps & {
  name: string;
};

type $State = {
  stringValue: string | null;
  numberValue: number | null;
};

class InputNumberView extends React.Component<$Props, $State> {
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

  setValue(value: string | null): void {
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
        {label && <Label>{label}</Label>}
        <AvInput
          placeholder={placeholder}
          name={`_${name}`}
          type="number"
          value={stringValue}
          required={required}
          disabled={disabled}
          onChange={(e) => this.setValue(e.target.value)}
          min={min}
          max={max}
        />
        <AvInput
          name={name}
          value={numberValue}
          style={{
            display: 'none',
          }}
        />
      </FormGroup>
    );
  }
}

export default InputNumberView;
