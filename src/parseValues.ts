import { FieldType } from '@grafana/data';
import dayjs from 'dayjs';

/**
 * parseValues converts values to the given field type.
 */
export const parseValues = (values: any[], type: FieldType): any[] => {
  switch (type) {
    case FieldType.time:
      // For time field, values are expected to be numbers representing a Unix
      // epoch in milliseconds.

      if (values.filter((_) => _).every((value) => typeof value === 'string')) {
        return values.map((_) => (_ !== null ? dayjs(_).valueOf() : _));
      }

      if (values.filter((_) => _).every((value) => typeof value === 'number')) {
        const ms = 1_000_000_000_000;

        // If there are no "big" numbers, assume seconds.
        if (values.filter((_) => _).every((_) => _ < ms)) {
          return values.map((_) => (_ !== null ? _ * 1000.0 : _));
        }

        // ... otherwise assume milliseconds.
        return values;
      }

      throw new Error('Unsupported time property');
    case FieldType.string:
      return values.every((_) => typeof _ === 'string')
        ? values
        : values.map((_) => {
            if (_ === null) {
              return _;
            } else if (typeof _ === 'object') {
              return JSON.stringify(_);
            } else {
              return _.toString();
            }
          });
    case FieldType.number:
      return values.every((_) => typeof _ === 'number') ? values : values.map((_) => (_ !== null ? parseFloat(_) : _));
    case FieldType.boolean:
      return values.every((_) => typeof _ === 'boolean')
        ? values
        : values.map((_) => {
            if (_ === null) {
              return _;
            }

            switch (_.toString()) {
              case '0':
              case 'false':
              case 'FALSE':
              case 'False':
                return false;
              case '1':
              case 'true':
              case 'TRUE':
              case 'True':
                return true;
              default:
                throw new Error('Found non-boolean values in a field of type boolean: ' + _.toString());
            }
          });
    default:
      throw new Error('Unsupported field type');
  }
};
