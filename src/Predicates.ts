const OPERATOR = {
  at: 'at',
  not: 'not',
  missing: 'missing',
  has: 'has',
  any: 'any',
  in: 'in',
  fulltext: 'fulltext',
  similar: 'similar',
  numberGt: 'number.gt',
  numberLt: 'number.lt',
  numberInRange: 'number.inRange',
  dateBefore: 'date.before',
  dateAfter: 'date.after',
  dateBetween: 'date.between',
  dateDayOfMonth: 'date.day-of-month',
  dateDayOfMonthAfter: 'date.day-of-month-after',
  dateDayOfMonthBefore: 'date.day-of-month-before',
  dateDayOfWeek: 'date.day-of-week',
  dateDayOfWeekAfter: 'date.day-of-week-after',
  dateDayOfWeekBefore: 'date.day-of-week-before',
  dateMonth: 'date.month',
  dateMonthBefore: 'date.month-before',
  dateMonthAfter: 'date.month-after',
  dateYear: 'date.year',
  dateHour: 'date.hour',
  dateHourBefore: 'date.hour-before',
  dateHourAfter: 'date.hour-after',
  GeopointNear: 'geopoint.near',
};

function encode(value: string | string[]): string | null {
  if (typeof value === 'string') {
    return `"${value}"`;
  } else if (value instanceof Array) {
    return `[${value.map(v => encode(v)).join(',')}]`;
  } else if (typeof value === 'number') {
    return value;
  } else {
    return null;
  }
}

const geopoint = {
  near(fragment: string, latitude: number, longitude: number, radius: number): string {
    return `[${OPERATOR.GeopointNear}(${fragment}, ${latitude}, ${longitude}, ${radius})]`;
  },
};

const date = {

  before(fragment: string, before: Date): string {
    return `[${OPERATOR.dateBefore}(${fragment}, ${before.getTime()})]`;
  },

  after(fragment: string, after: Date): string {
    return `[${OPERATOR.dateAfter}(${fragment}, ${after.getTime()})]`;
  },

  between(fragment: string, before: Date, after: Date): string {
    return `[${OPERATOR.dateBetween}(${fragment}, ${before.getTime()}, ${after.getTime()})]`;
  },

  dayOfMonth(fragment: string, day: number): string {
    return `[${OPERATOR.dateDayOfMonth}(${fragment}, ${day})]`;
  },

  dayOfMonthAfter(fragment: string, day: number): string {
    return `[${OPERATOR.dateDayOfMonthAfter}(${fragment}, ${day})]`;
  },

  dayOfMonthBefore(fragment: string, day: number): string {
    return `[${OPERATOR.dateDayOfMonthBefore}(${fragment}, ${day})]`;
  },

  dayOfWeek(fragment: string, day: number): string {
    return `[${OPERATOR.dateDayOfWeek}(${fragment}, ${day})]`;
  },

  dayOfWeekAfter(fragment: string, day: number): string {
    return `[${OPERATOR.dateDayOfWeekAfter}(${fragment}, ${day})]`;
  },

  dayOfWeekBefore(fragment: string, day: number): string {
    return `[${OPERATOR.dateDayOfWeekBefore}(${fragment}, ${day})]`;
  },

  month(fragment: string, month: number | string): string {
    if (typeof month === 'number') {
      return `[${OPERATOR.dateMonth}(${fragment}, ${month})]`;
    } else {
      return `[${OPERATOR.dateMonth}(${fragment}, "${month}")]`;
    }
  },

  monthBefore(fragment: string, month: number | string): string {
    if (typeof month === 'number') {
      return `[${OPERATOR.dateMonthBefore}(${fragment}, ${month})]`;
    } else {
      return `[${OPERATOR.dateMonthBefore}(${fragment}, "${month}")]`;
    }
  },

  monthAfter(fragment: string, month: number | string): string {
    if (typeof month === 'number') {
      return `[${OPERATOR.dateMonthAfter}(${fragment}, ${month})]`;
    } else {
      return `[${OPERATOR.dateMonthAfter}(${fragment}, "${month}")]`;
    }
  },

  year(fragment: string, year: number): string {
    return `[${OPERATOR.dateYear}(${fragment}, ${year})]`;
  },

  hour(fragment: string, hour: number): string {
    return `[${OPERATOR.dateHour}(${fragment}, ${hour})]`;
  },

  hourBefore(fragment: string, hour: number): string {
    return `[${OPERATOR.dateHourBefore}(${fragment}, ${hour})]`;
  },

  hourAfter(fragment: string, hour: number): string {
    return `[${OPERATOR.dateHourAfter}(${fragment}, ${hour})]`;
  },
};

const number = {
  gt(fragment: string, value: number): string {
    return `[${OPERATOR.numberGt}(${fragment}, ${value})]`;
  },

  lt(fragment: string, value: number): string {
    return `[${OPERATOR.numberLt}(${fragment}, ${value})]`;
  },

  inRange(fragment: string, before: number, after: number): string {
    return `[${OPERATOR.numberInRange}(${fragment}, ${before}, ${after})]`;
  },
};

export default {
  at(fragment: string, value: string | string[]): string {
    return `[${OPERATOR.at}(${fragment}, ${encode(value)})]`;
  },
  
  not(fragment: string, value: string): string {
    return `[${OPERATOR.not}(${fragment}, ${encode(value)})]`;
  },

  missing(fragment: string): string {
    return `[${OPERATOR.missing}(${fragment})]`;
  },

  has(fragment: string): string {
    return `[${OPERATOR.has}(${fragment})]`;
  },

  any(fragment: string, values: string[]): string {
    return `[${OPERATOR.any}(${fragment}, ${encode(values)})]`;
  },

  in(fragment: string, values: string[]): string {
    return `[${OPERATOR.in}(${fragment}, ${encode(values)})]`;
  },

  fulltext(fragment: string, value: string): string {
    return `[${OPERATOR.fulltext}(${fragment}, ${encode(value)})]`;
  },

  similar(documentId: string, maxResults: number): string {
    return `[${OPERATOR.similar}("${documentId}", ${maxResults})]`;
  },

  date,

  dateBefore: date.before,

  dateAfter: date.after,

  dateBetween: date.between,

  dayOfMonth: date.dayOfMonth,

  dayOfMonthAfter: date.dayOfMonthAfter,

  dayOfMonthBefore: date.dayOfMonthBefore,

  dayOfWeek: date.dayOfWeek,

  dayOfWeekAfter: date.dayOfWeekAfter,

  dayOfWeekBefore: date.dayOfWeekBefore,

  month: date.month,

  monthBefore: date.monthBefore,

  monthAfter: date.monthAfter,

  year: date.year,

  hour: date.hour,

  hourBefore: date.hourBefore,

  hourAfter: date.hourAfter,

  number,

  gt: number.gt,

  lt: number.lt,

  inRange: number.inRange,

  near: geopoint.near,

  geopoint,
};
