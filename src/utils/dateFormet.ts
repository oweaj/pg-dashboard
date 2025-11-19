import { format } from "date-fns";
import { ko } from "date-fns/locale";

export const dateFormat = (date: Date | string, option: { day: boolean }) => {
  if (typeof date === "string") new Date(date);
  const formatDate = option.day ? "yyyy.MM.dd EEEE" : "yyyy.MM.dd";

  return format(date, formatDate, { locale: ko });
};
