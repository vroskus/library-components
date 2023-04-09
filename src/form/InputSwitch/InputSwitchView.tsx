// Global Components
import * as React from 'react';
import {
  Button,
  ButtonGroup,
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
  onChange?: (value: boolean) => unknown;
  value?: boolean;
};

type $Props = $OptionalProps & {
  name: string;
  labelFalse: string;
  labelTrue: string;
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

  renderButtons() {
    const {
      disabled,
      labelFalse,
      labelTrue,
      onChange,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <>
        <Button
          outline={!value}
          color={value ? 'success' : 'secondary'}
          onClick={() => this.setState(
            {
              value: true,
            },
            () => onChange && onChange(true),
          )}
          disabled={disabled}
        >
          {labelTrue}
        </Button>
        <Button
          outline={value}
          color={!value ? 'danger' : 'secondary'}
          onClick={() => this.setState(
            {
              value: false,
            },
            () => onChange && onChange(false),
          )}
          disabled={disabled}
        >
          {labelFalse}
        </Button>
      </>
    );
  }

  render() {
    const {
      className,
      label,
      name,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <>
        {label && (
        <>
          <Label>{label}</Label>
          <br />
        </>
        )}
        <ButtonGroup className={className}>
          {this.renderButtons()}
        </ButtonGroup>
        <AvInput
          name={name}
          type="checkbox"
          value={value}
          checked={value}
          style={{
            display: 'none',
          }}
        />
      </>
    );
  }
}

export default InputSwitchView;
