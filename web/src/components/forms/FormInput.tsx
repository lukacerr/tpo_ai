/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormControlTypeMap,
  FormLabel,
  FormLabelTypeMap,
  Input,
  InputTypeMap,
  Option,
  Select,
  SelectTypeMap,
} from '@mui/joy';

interface IFormInput {
  required?: boolean;
  label: string;
  name: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  selectValues?: { value: string | number; label: string; default?: boolean }[];
  labelOptions?: FormLabelTypeMap;
  inputOptions?: InputTypeMap | SelectTypeMap<any>;
  controlOptions?: FormControlTypeMap;
}

export default function FormInput({
  required,
  label,
  name,
  placeholder,
  type,
  selectValues,
  labelOptions,
  inputOptions,
  controlOptions,
}: React.PropsWithRef<IFormInput>) {
  return (
    <FormControl {...controlOptions} required={required}>
      <FormLabel {...labelOptions}>{label}</FormLabel>
      {selectValues && selectValues.length ? (
        <Select
          {...inputOptions}
          placeholder={placeholder}
          name={name}
          defaultValue={selectValues.find((v) => v.default)?.value}
        >
          {selectValues.map((sv) => (
            <Option key={sv.value} value={sv.value}>
              {sv.label}
            </Option>
          ))}
        </Select>
      ) : (
        <Input {...inputOptions} placeholder={placeholder} type={type} name={name} />
      )}
    </FormControl>
  );
}
