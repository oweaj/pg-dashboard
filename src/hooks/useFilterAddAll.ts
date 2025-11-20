import { useMemo } from "react";

export interface IOptionType {
  value: string;
  label: string;
}

export const useFilterAddAll = <T>(data: T[] | undefined, mapFn: (data: T) => IOptionType): IOptionType[] => {
  return useMemo(() => {
    const filterList = data?.map(mapFn) ?? [];
    return [{ value: "ALL", label: "전체" }, ...filterList];
  }, [data, mapFn]);
};
