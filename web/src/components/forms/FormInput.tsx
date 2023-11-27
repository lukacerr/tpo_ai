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
  Textarea,
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
  onChange?: (v: any) => void;
  disabled?: boolean;
  value?: any;
  multiline?: boolean;
  minRows?: number;
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
  onChange,
  disabled,
  value,
  multiline,
  minRows,
}: React.PropsWithRef<IFormInput>) {
  return (
    <FormControl disabled={disabled} {...controlOptions} required={required}>
      <FormLabel {...labelOptions}>{label}</FormLabel>
      {selectValues && selectValues.length ? (
        <Select
          {...inputOptions}
          placeholder={placeholder}
          name={name}
          onChange={onChange ? (_, nv) => onChange(nv) : undefined}
          defaultValue={selectValues.find((v) => v.default)?.value}
        >
          {selectValues.map((sv) => (
            <Option key={sv.value} value={sv.value}>
              {sv.label}
            </Option>
          ))}
        </Select>
      ) : multiline ? (
        <Textarea
          {...inputOptions}
          minRows={minRows || 3}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      ) : (
        <Input
          {...inputOptions}
          placeholder={placeholder}
          type={type}
          name={name}
          value={value}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </FormControl>
  );
}
