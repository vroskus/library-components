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
  onChange?: (value: number) => unknown;
  value?: null | number;
};

type $Props = $OptionalProps & {
  labelDisabled: string;
  labelEnabled: string;
  labelRequired: string;
  name: string;
};

type $State = {
  value: number;
};

const zeroValue: number = 0;
const oneValue: number = 1;
const twoValue: number = 2;

class Component extends React.Component<$Props, $State> {
  static readonly defaultProps: $OptionalProps = {
    disabled: undefined,
    onChange: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      value: props.value || zeroValue,
    };
  }

  componentDidUpdate(prevProps: $Props) {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value: value || zeroValue,
      });
    }
  }

  render() {
    const {
      disabled,
      labelDisabled,
      labelEnabled,
      labelRequired,
      name,
      onChange,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <>
        <ButtonGroup>
          <Button
            disabled={disabled}
            onClick={() => this.setState(
              {
                value: zeroValue,
              },
              () => onChange && onChange(zeroValue),
            )}
            outline={value !== zeroValue}
            size={'xs'}
          >
            {labelDisabled}
          </Button>
          <Button
            color={'success'}
            disabled={disabled}
            onClick={() => this.setState(
              {
                value: oneValue,
              },
              () => onChange && onChange(oneValue),
            )}
            outline={value !== oneValue}
            size={'xs'}
          >
            {labelEnabled}
          </Button>
          <Button
            color={'warning'}
            disabled={disabled}
            onClick={() => this.setState(
              {
                value: twoValue,
              },
              () => onChange && onChange(twoValue),
            )}
            outline={value !== twoValue}
            size={'xs'}
          >
            {labelRequired}
          </Button>
        </ButtonGroup>
        <AvInput
          disabled={disabled}
          name={name}
          style={{
            display: 'none',
          }}
          value={value}
        />
      </>
    );
  }
}

export default Component;
