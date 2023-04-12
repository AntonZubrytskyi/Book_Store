const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

export const formatDateHelper = (date: Date) => [
  padTo2Digits(date.getDate()),
  padTo2Digits(date.getMonth() + 1),
  date.getFullYear(),
].join('/');
