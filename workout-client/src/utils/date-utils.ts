import moment from 'moment';

function formattedDate(date: Date | string, format: string ): string {
  return moment(date).format(format);
}

export {
  formattedDate,
}