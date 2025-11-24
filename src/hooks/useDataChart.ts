import { useMemo } from "react";
import type { IPaymentListType } from "@/types/payment.type";
import { format, getDaysInMonth } from "date-fns";
import { ko } from "date-fns/locale";

const useDataChart = (data: IPaymentListType[], type: string) => {
  return useMemo(() => {
    const today = new Date();
    let labels: string[] = [];

    if (type === "week") {
      labels = ["일", "월", "화", "수", "목", "금", "토"];
    } else if (type === "month") {
      const step = 3;
      const labelCount = Math.ceil(getDaysInMonth(today) / step);
      labels = Array.from({ length: labelCount }, (_, i) =>
        format(new Date(today.getFullYear(), today.getMonth(), i * step + 1), "d일", { locale: ko })
      );
    } else if (type === "year") {
      labels = Array.from({ length: 12 }, (_, i) => format(new Date(today.getFullYear(), i, 1), "MMM", { locale: ko }));
    }

    const dataMap: Record<string, number> = {};
    data.forEach((item) => {
      const date = new Date(item.paymentAt);
      let label = "";
      if (type === "week") {
        label = labels[date.getDay()];
      } else if (type === "month") {
        const day = date.getDate();
        const step = 3;
        const index = Math.min(Math.floor((day - 1) / step), labels.length - 1);
        label = labels[index];
      } else if (type === "year") {
        const month = date.getMonth();
        label = labels[month];
      }

      dataMap[label] = (dataMap[label] || 0) + parseFloat(item.amount);
    });

    return labels.map((label) => ({ label, total: dataMap[label] || 0 }));
  }, [data, type]);
};

export default useDataChart;
