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
    min?: Date;
    max?: Date;
  };
  required?: boolean;
  value?: Date | string | null;
};

type $Props = $OptionalProps & {
  labelOpenCalendar: string;
  name: string;
  timezone: string;
};

type $State = {
  dateValue: Date | null;
  stringValue?: string | null;
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

  setValue(value: string | null): void {
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

  changeValue(value: string | null): void {
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

  isValidDate(value: string | null | void): boolean {
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
  validateValue(value: string | null | void): boolean {
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
        {label && <Label>{label}</Label>}
        <InputGroup>
          <AvInput
            value={stringValue}
            onChange={(e) => this.changeValue(e.target.value === '' ? null : e.target.value)}
            name={`_${name}`}
            disabled={disabled}
            validate={{
              async: async (v) => this.validateValue(v),
            }}
            required={required}
          />
          <AvInput
            name={name}
            value={dateValue}
            style={{
              display: 'none',
            }}
          />
          <Button
            color="default"
            title={labelOpenCalendar}
            onClick={openCalendar}
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
        value={stringValue}
        dateFormat="YYYY-MM-DD"
        timeFormat="HH:mm"
        displayTimeZone={timezone}
        onChange={(m: moment.Moment) => this.changeValue(m.format(this.format))}
        renderInput={(props: $Props, open: () => unknown) => this.renderInput(
          props,
          open,
        )}
        isValidDate={(value) => this.isValidRange(value)}
      />
    );
  }
}

export default InputDateTimeView;
