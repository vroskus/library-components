// Global Components
import * as React from 'react';
import {
  Button,
  ButtonGroup,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';

// Types
type $OptionalProps = {
  disabled?: boolean;
  onChange?: (value: boolean) => unknown;
  trueColor?: string;
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

class InputDoubleButtonView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    disabled: undefined,
    onChange: undefined,
    trueColor: undefined,
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
      disabled,
      labelFalse,
      labelTrue,
      name,
      onChange,
      trueColor,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <>
        <ButtonGroup>
          <Button
            size="xs"
            outline={value}
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
          <Button
            size="xs"
            outline={!value}
            color={trueColor || 'success'}
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
        </ButtonGroup>
        <AvInput
          name={name}
          type="checkbox"
          value={value}
          checked={value}
          style={{
            display: 'none',
          }}
          disabled={disabled}
        />
      </>
    );
  }
}

export default InputDoubleButtonView;
