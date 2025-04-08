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

class Component extends React.Component<$OptionalProps> {
  static readonly defaultProps: $OptionalProps = {
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

  getViewText(
    dateMoment: moment.Moment,
    dateText: string,
  ): null | string {
    const {
      countdown,
      duration,
    } = this.props;

    const nowMoment = moment();
    const humanText = moment.duration(dateMoment.diff(nowMoment)).humanize(true);

    if (countdown) {
      return dateMoment.isAfter(nowMoment)
        ? humanText
        : countdown;
    }

    return duration
      ? humanText
      : dateText;
  }

  renderDateTd() {
    const {
      multiple,
      value,
    } = this.props;

    const dateMoment = moment.utc(value).local();
    const dateText = dateMoment.format(this.getFormat());
    const viewText = this.getViewText(
      dateMoment,
      dateText,
    );

    return multiple === true ? (
      <td className={'TdDate TdDate-multiple'}>
        <div className={'text-nowrap'}>
          {viewText}
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
        {viewText}
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
