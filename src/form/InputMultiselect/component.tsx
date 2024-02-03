// Global Components
import * as React from 'react';
import {
  FormGroup,
} from 'reactstrap';
import {
  AvField,
} from 'availity-reactstrap-validation';

// Helpers
import _ from 'lodash';

// Types
type $Option = {
  id: string,
} & Record<string, unknown>;

type $Options = Array<$Option>;

type $OptionalProps = {
  label?: string;
  labelKey?: string;
  onChange?: (arg0: Array<string>) => unknown;
  required?: boolean;
  value?: Array<$Option>;
};

type $Props = $OptionalProps & {
  labelSelectMultiple: string;
  name: string;
  options: $Options;
};

type $State = {
  value: Array<string>;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    label: undefined,
    labelKey: undefined,
    onChange: undefined,
    required: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      value: _.map(
        props.value || [],
        'id',
      ),
    };
  }

  componentDidUpdate(prevProps: $Props) {
    const {
      value,
    } = this.props;

    if (!_.isEqual(
      value,
      prevProps.value,
    )) {
      this.setState({
        value: _.map(
          value || [],
          'id',
        ),
      });
    }
  }

  render() {
    const {
      label,
      labelKey,
      labelSelectMultiple,
      name,
      onChange,
      options,
      required,
    } = this.props;
    const {
      value,
    } = this.state;

    const labelKeyToUse: string = labelKey || 'Name';

    return (
      <FormGroup className="InputMultiselect">
        <AvField
          label={label}
          multiple
          name={name}
          onChange={(e) => {
            const toggleValue: string = e.target.value;

            const newValue: Array<string> = _.xor(
              value,
              [toggleValue],
            );

            this.setState({
              value: newValue,
            });

            if (onChange) {
              onChange(newValue);
            }
          }}
          placeholder={labelSelectMultiple}
          required={required}
          type="select"
          value={value}
        >
          {options.map((option: $Option) => (
            <option
              key={option.id}
              value={option.id}
            >
              {(option[labelKeyToUse] as string | void) || '---'}
            </option>
          ))}
        </AvField>
      </FormGroup>
    );
  }
}

export default Component;
