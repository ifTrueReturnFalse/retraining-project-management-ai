export const numericMonthToString = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export function ISODateToTaskView(date: string) {
  const isoDate = new Date(date);
  return isoDate.getDate() + " " + numericMonthToString[isoDate.getMonth()];
}
