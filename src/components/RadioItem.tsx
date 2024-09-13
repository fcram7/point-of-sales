import { FormControl, FormItem } from './ui/form';
import { Label } from './ui/label';
import { RadioGroupItem } from './ui/radio-group';

interface radioItem {
  value: string;
  id: string;
  label: string;
  htmlFor: string;
}

export const RadioItem = ({ id, value, label, htmlFor }: radioItem) => {
  return (
    <FormItem className='flex items-center space-x-2 space-y-0'>
      <FormControl>
        <RadioGroupItem value={value} id={id} />
      </FormControl>
      <Label className='mt-0' htmlFor={htmlFor}>
        {label}
      </Label>
    </FormItem>
  );
};
