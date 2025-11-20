import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import type { IOptionType } from "@/hooks/useFilterAddAll";

interface IFilterSelectProps {
  onChange: (value: string) => void;
  items: IOptionType[];
  placeholder: string;
}

const FilterSelect = ({ items, placeholder, onChange }: IFilterSelectProps) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger size="sm" className="cursor-pointer">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
