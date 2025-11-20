import { useMemo } from "react";

export const useDataCount = <T>(
  data: T[] | undefined,
  value: (item: T) => string | undefined,
  label?: (item: T) => string | undefined
) => {
  return useMemo(() => {
    const result: { value: string; label: string; count: number }[] = [];
    data?.forEach((item) => {
      const checkData = value(item) || "기타";
      const current = result.find((data) => data.value === checkData);
      if (current) {
        current.count += 1;
      } else {
        result.push({
          value: checkData,
          label: label?.(item) || "기타",
          count: 1,
        });
      }
    });
    return result;
  }, [data, value, label]);
};
