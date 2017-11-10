import moment from 'moment';
const date = function(date, format) {
  if (!date) return '';

  var f = format || 'DD MMMM YYYY, HH:mm';
  var m = moment(date);
  if (!m.isValid()) return '';

  return m.format(f);
}

export default date;