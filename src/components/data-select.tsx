import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface IFilterSelectProps<TItem> {
  onChange: (value: string) => void;
  items: TItem[];
  placeholder: string;
  getValue: (item: TItem) => string;
  getLabel: (item: TItem) => string;
}

const FilterSelect = <TItem,>({ items, placeholder, onChange, getValue, getLabel }: IFilterSelectProps<TItem>) => {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger size="sm">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={getValue(item)} value={getValue(item)}>
            {getLabel(item)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterSelect;
