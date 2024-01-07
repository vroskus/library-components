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

class InputTripleButtonView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    disabled: undefined,
    onChange: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      value: props.value || 0,
    };
  }

  componentDidUpdate(prevProps: $Props) {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setState({
        value: value || 0,
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
                value: 0,
              },
              () => onChange && onChange(0),
            )}
            outline={value !== 0}
            size="xs"
          >
            {labelDisabled}
          </Button>
          <Button
            color="success"
            disabled={disabled}
            onClick={() => this.setState(
              {
                value: 1,
              },
              () => onChange && onChange(1),
            )}
            outline={value !== 1}
            size="xs"
          >
            {labelEnabled}
          </Button>
          <Button
            color="warning"
            disabled={disabled}
            onClick={() => this.setState(
              {
                value: 2,
              },
              () => onChange && onChange(2),
            )}
            outline={value !== 2}
            size="xs"
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

export default InputTripleButtonView;
