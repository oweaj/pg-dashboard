import { useMemo } from "react";

export const useDataCount = <T>(
  data: T[] | undefined,
  value: (item: T) => string | undefined,
  label?: (item: T) => string | undefined
) => {
  return useMemo(() => {
    const result: { value: string; label: string; count: number }[] = [];
    data?.forEach((item, i) => {
      const checkData = value(item) || "알수없음";
      const current = result.find((data) => data.value === checkData);
      if (current) {
        current.count += 1;
      } else {
        result.push({
          value: checkData,
          label: label?.(item) || `기타-${i}`,
          count: 1,
        });
      }
    });
    return result;
  }, [data, value, label]);
};
