// Global Components
import * as React from 'react';
import {
  Button,
  FormGroup,
  InputGroup,
  Label,
} from 'reactstrap';
import {
  AvInput,
} from 'availity-reactstrap-validation';
import Datetime from 'react-datetime';

// Helpers
import moment from 'moment';
import momentTimezone from 'moment-timezone';

// Types
type $OptionalProps = {
  disabled?: boolean;
  format?: string;
  label?: string;
  onChange?: (value: Date | null) => unknown;
  range?: {
    max?: Date;
    min?: Date;
  };
  required?: boolean;
  value?: Date | null | string;
};

type $Props = $OptionalProps & {
  labelOpenCalendar: string;
  name: string;
  timezone: string;
};

type $State = {
  dateValue: Date | null;
  stringValue?: null | string;
};

class InputDateTimeView extends React.Component<$Props, $State> {
  format: string;

  static defaultProps: $OptionalProps = {
    disabled: undefined,
    format: undefined,
    label: undefined,
    onChange: undefined,
    range: undefined,
    required: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    this.state = {
      dateValue: null,
      stringValue: undefined,
    };

    this.format = props.format || 'YYYY-MM-DD HH:mm';
  }

  componentDidMount() {
    const {
      value,
    } = this.props;

    if (value) {
      this.setValue(value !== null ? moment(value).format(this.format) : null);
    }
  }

  componentDidUpdate(prevProps: $Props): void {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setValue(value !== null ? moment(value).format(this.format) : null);
    }
  }

  setValue(value: null | string): void {
    const {
      timezone,
    } = this.props;

    const dateValue: Date | null = value ? momentTimezone.tz(
      value,
      timezone,
    ).toDate() : null;

    this.setState({
      dateValue,
      stringValue: value,
    });
  }

  changeValue(value: null | string): void {
    const {
      onChange,
      timezone,
    } = this.props;

    const dateValue: Date | null = value ? momentTimezone.tz(
      value,
      timezone,
    ).toDate() : null;

    if (onChange && this.validateValue(value)) {
      onChange(dateValue);
    }

    this.setState({
      dateValue,
      stringValue: value,
    });
  }

  isValidDate(value: null | string | void): boolean {
    if (value) {
      return moment(
        value,
        this.format,
        true,
      ).isValid();
    }

    return false;
  }

  /* eslint-disable-next-line complexity */
  isValidRange(value: moment.Moment): boolean {
    const {
      range,
    } = this.props;

    if (range) {
      const {
        max,
        min,
      } = range;

      if (min && value.isBefore(min)) {
        return false;
      }

      if (max && value.isAfter(max)) {
        return false;
      }
    }

    return true;
  }

  /* eslint-disable-next-line complexity */
  validateValue(value: null | string | void): boolean {
    const {
      required,
    } = this.props;

    if (!required && (value === null || value === '')) {
      return true;
    }

    if (value && this.isValidDate(value) && this.isValidRange(moment(value))) {
      return true;
    }

    return false;
  }

  renderInput(props: unknown, openCalendar: () => unknown) {
    const {
      disabled,
      label,
      labelOpenCalendar,
      name,
      required,
    } = this.props;
    const {
      dateValue,
      stringValue,
    } = this.state;

    return (
      <FormGroup className="InputDateTime">
        {label && (
          <Label>
            {label}
          </Label>
        )}
        <InputGroup>
          <AvInput
            disabled={disabled}
            name={`_${name}`}
            onChange={(e) => this.changeValue(e.target.value === '' ? null : e.target.value)}
            required={required}
            validate={{
              async: async (v) => this.validateValue(v),
            }}
            value={stringValue}
          />
          <AvInput
            name={name}
            style={{
              display: 'none',
            }}
            value={dateValue}
          />
          <Button
            color="default"
            onClick={openCalendar}
            title={labelOpenCalendar}
          >
            <em className="fa icon-clock" />
          </Button>
        </InputGroup>
      </FormGroup>
    );
  }

  render() {
    const {
      timezone,
    } = this.props;
    const {
      stringValue,
    } = this.state;

    return (
      <Datetime
        dateFormat="YYYY-MM-DD"
        displayTimeZone={timezone}
        isValidDate={(value) => this.isValidRange(value)}
        onChange={(m: moment.Moment) => this.changeValue(m.format(this.format))}
        renderInput={(props: $Props, open: () => unknown) => this.renderInput(
          props,
          open,
        )}
        timeFormat="HH:mm"
        value={stringValue}
      />
    );
  }
}

export default InputDateTimeView;
