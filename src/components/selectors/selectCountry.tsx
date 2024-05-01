import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { countryList } from '@/lib/static/countryList';
import { memo } from 'react';

type Props = {
  emit?: (value: string) => void;
};

export const SelectCountry = memo(function SelectCountry(props: Props) {
  return (
    <Select onValueChange={props.emit}>
      <SelectTrigger className="">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent>
        {countryList.map((country) => (
          <SelectItem key={country.code} value={country.name}>
            {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
