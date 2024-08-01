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
import 'moment-timezone';

// Types
type $OptionalProps = {
  className?: string;
  dateFormat?: string;
  disabled?: boolean;
  label?: string;
  onChange?: (value: Date | null) => unknown;
  range?: {
    max?: Date;
    min?: Date;
  };
  required?: boolean;
  timeFormat?: string;
  timezone?: string;
  value?: Date | null | string;
};

type $Props = $OptionalProps & {
  labelOpenCalendar: string;
  name: string;
};

type $State = {
  dateFormat: string;
  dateValue: Date | null;
  fullFormat: string;
  stringValue: null | string;
  timeFormat: string;
};

class Component extends React.Component<$Props, $State> {
  static defaultProps: $OptionalProps = {
    className: undefined,
    dateFormat: undefined,
    disabled: undefined,
    label: undefined,
    onChange: undefined,
    range: undefined,
    required: undefined,
    timeFormat: undefined,
    timezone: undefined,
    value: undefined,
  };

  constructor(props: $Props) {
    super(props);

    const dateFormat = props.dateFormat || 'YYYY-MM-DD';
    const timeFormat = props.timeFormat || 'HH:mm';
    const fullFormat = `${dateFormat} ${timeFormat}`;

    this.state = {
      dateFormat,
      dateValue: null,
      fullFormat,
      stringValue: null,
      timeFormat,
    };
  }

  componentDidMount() {
    const {
      value,
    } = this.props;

    if (value) {
      this.setValue(value);
    }
  }

  componentDidUpdate(prevProps: $Props): void {
    const {
      value,
    } = this.props;

    if (prevProps.value !== value) {
      this.setValue(value);
    }
  }

  getDate(value: Date | null | string | undefined): Date {
    const {
      timezone,
    } = this.props;

    if (timezone) {
      return moment.tz(
        value,
        timezone,
      ).toDate();
    }

    return moment(value).toDate();
  }

  setValue(value: Date | null | string | undefined): void {
    const {
      fullFormat,
    } = this.state;

    let dateValue: Date | null = null;
    let stringValue: null | string = null;

    if (value) {
      dateValue = this.getDate(value);
      stringValue = moment(value).format(fullFormat);
    }

    this.setState({
      dateValue,
      stringValue,
    });
  }

  changeValue(value: null | string): void {
    const {
      onChange,
    } = this.props;

    const dateValue: Date | null = value ? this.getDate(value) : null;

    if (onChange && this.validateValue(value)) {
      onChange(dateValue);
    }

    this.setState({
      dateValue,
      stringValue: value,
    });
  }

  isValidDate(value: null | string | void): boolean {
    const {
      fullFormat,
    } = this.state;

    if (value) {
      return moment(
        value,
        fullFormat,
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

  renderInput(props: $Props, openCalendar: unknown): JSX.Element {
    const {
      className,
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
      <FormGroup className={`InputDateTime ${className || ''}`}>
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
            onClick={() => {
              if (typeof openCalendar === 'function') {
                openCalendar();
              }
            }}
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
      dateFormat,
      fullFormat,
      stringValue,
      timeFormat,
    } = this.state;

    return (
      <Datetime
        dateFormat={dateFormat}
        displayTimeZone={timezone}
        isValidDate={(value) => this.isValidRange(value)}
        onChange={(value) => {
          let valueMoment;

          if (typeof value === 'string') {
            valueMoment = moment(value);
          } else {
            valueMoment = value;
          }

          if (valueMoment) {
            this.changeValue(valueMoment.format(fullFormat));
          }
        }}
        renderInput={(props: $Props, openCalendar) => this.renderInput(
          props,
          openCalendar,
        )}
        timeFormat={timeFormat}
        value={stringValue || undefined}
      />
    );
  }
}

export default Component;
