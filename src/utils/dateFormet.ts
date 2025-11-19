import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface IDateFormatOption {
  day?: boolean;
  time?: boolean;
}

export const dateFormat = (date: Date | string, option?: IDateFormatOption) => {
  if (typeof date === "string") new Date(date);

  let formatDate = "yyyy.MM.dd ";
  if (option?.day) formatDate += "EEEE";
  else if (option?.time) formatDate += "/ a hh:mm";

  return format(date, formatDate, { locale: ko });
};
