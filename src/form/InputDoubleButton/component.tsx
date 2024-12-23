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
  labelFalse: string;
  labelTrue: string;
  name: string;
};

type $State = {
  value: boolean;
};

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
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
          color={value ? 'success' : 'secondary'}
          disabled={disabled}
          onClick={() => this.setState(
            {
              value: true,
            },
            () => onChange && onChange(true),
          )}
          outline={!value}
        >
          {labelTrue}
        </Button>
        <Button
          color={!value ? 'danger' : 'secondary'}
          disabled={disabled}
          onClick={() => this.setState(
            {
              value: false,
            },
            () => onChange && onChange(false),
          )}
          outline={value}
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
            <Label>
              {label}
            </Label>
            <br />
          </>
        )}
        <ButtonGroup className={className}>
          {this.renderButtons()}
        </ButtonGroup>
        <AvInput
          checked={value}
          name={name}
          style={{
            display: 'none',
          }}
          type={'checkbox'}
          value={value}
        />
      </>
    );
  }
}

export default Component;
