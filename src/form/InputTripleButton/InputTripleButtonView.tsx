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
  value?: number | null;
};

type $Props = $OptionalProps & {
  name: string;
  labelDisabled: string;
  labelEnabled: string;
  labelRequired: string;
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
            size="xs"
            outline={value !== 0}
            onClick={() => this.setState(
              {
                value: 0,
              },
              () => onChange && onChange(0),
            )}
            disabled={disabled}
          >
            {labelDisabled}
          </Button>
          <Button
            size="xs"
            outline={value !== 1}
            color="success"
            onClick={() => this.setState(
              {
                value: 1,
              },
              () => onChange && onChange(1),
            )}
            disabled={disabled}
          >
            {labelEnabled}
          </Button>
          <Button
            size="xs"
            outline={value !== 2}
            color="warning"
            onClick={() => this.setState(
              {
                value: 2,
              },
              () => onChange && onChange(2),
            )}
            disabled={disabled}
          >
            {labelRequired}
          </Button>
        </ButtonGroup>
        <AvInput
          name={name}
          value={value}
          style={{
            display: 'none',
          }}
          disabled={disabled}
        />
      </>
    );
  }
}

export default InputTripleButtonView;
