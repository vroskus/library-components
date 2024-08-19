// Global Components
import * as React from 'react';

// Helpers
import moment from 'moment';

// Types
type $OptionalProps = {
  countdown?: string;
  duration?: boolean;
  format?: {
    date: string;
    dateTime: string;
  };
  multiple?: boolean;
  type?: 'date' | 'dateTime';
  value?: Date | null | string;
};

type $Props = $OptionalProps;

class Component extends React.Component<$Props> {
  static defaultProps: $OptionalProps = {
    countdown: undefined,
    duration: undefined,
    format: undefined,
    multiple: undefined,
    type: undefined,
    value: undefined,
  };

  getFormat(): string {
    const {
      format,
      type,
    } = this.props;

    const formatToUse = format || {
      date: 'YYYY-MM-DD',
      dateTime: 'YYYY-MM-DD HH:mm',
    };
    const typeToUse = type || 'dateTime';

    return formatToUse[typeToUse];
  }

  renderDateTd() {
    const {
      countdown,
      duration,
      multiple,
      value,
    } = this.props;

    const date = moment.utc(value).local();
    const dateText = date.format(this.getFormat());

    let view: null | string = null;

    if (countdown) {
      view = date.isAfter(moment())
        ? moment.duration(date.diff(moment())).humanize(true)
        : countdown;
    } else {
      view = duration
        ? moment.duration(date.diff(moment())).humanize(true)
        : dateText;
    }

    return multiple === true ? (
      <td className={'TdDate TdDate-multiple'}>
        <div className={'text-nowrap'}>
          {view}
        </div>
        <small className={'text-muted text-nowrap'}>
          {dateText}
        </small>
      </td>
    ) : (
      <td
        className={'TdDate text-nowrap'}
        title={dateText}
      >
        {view}
      </td>
    );
  }

  render() {
    const {
      value,
    } = this.props;

    return value ? this.renderDateTd() : <td />;
  }
}

export default Component;
