// Global Components
import * as React from 'react';
import {
  FormGroup,
  Label,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';
import ReactQuill from 'react-quill';

// Helpers
import _ from 'lodash';

// Types
type $OptionalProps = {
  height?: number;
  label?: string;
  onChange?: (value: null | string) => unknown;
  value?: null | string;
};

type $Props = $OptionalProps & {
  name: string;
};

type $State = {
  value: null | string;
};

class InputHtmlView extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    height: undefined,
    label: undefined,
    onChange: undefined,
    value: undefined,
  };

  onChange: (value: null | string) => unknown;

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

  setValue(newValue: null | string): void {
    let value = newValue;

    if (newValue === '<p><br></p>') {
      value = null;
    }

    this.setState({
      value,
    });

    this.onChange(value);
  }

  render() {
    const {
      height,
      label,
      name,
    } = this.props;
    const {
      value,
    } = this.state;

    return (
      <FormGroup className="InputHtml">
        {label && (
          <Label>
            {label}
          </Label>
        )}
        <ReactQuill
          onChange={(newValue) => this.setValue(newValue)}
          style={{
            height,
          }}
          value={value}
        />
        <AvInput
          name={name}
          style={{
            display: 'none',
          }}
          value={value}
        />
      </FormGroup>
    );
  }
}

export default InputHtmlView;
