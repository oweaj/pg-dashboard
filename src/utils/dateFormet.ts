import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const dateFormat = (date: Date, type = "yyyy.MM.dd EEEE") => {
  return date ? format(date, type, { locale: ko }) : "";
};
