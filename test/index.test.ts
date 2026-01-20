import moment from 'moment';
import momentTimezone from 'moment-timezone';

describe(
  'moment',
  () => {
    it(
      'should not tz() be undefined for momentTimezone',
      async () => {
        expect(typeof momentTimezone.tz !== 'undefined').toBe(true);
      },
    );

    it(
      'should not tz() be undefined for moment',
      async () => {
        expect(typeof moment.tz !== 'undefined').toBe(true);
      },
    );
  },
);
