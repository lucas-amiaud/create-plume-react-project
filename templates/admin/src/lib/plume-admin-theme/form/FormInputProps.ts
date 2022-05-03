import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';
import { FocusEventHandler } from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type InputTextProps = {
  type?: string;
  name?: string;
  id?: string;
  useNameAsId?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  defaultValue?: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  control: Control<any>;
  // focus event
  onBlur?: FocusEventHandler<any>;
  onChange?: (value: { target: { value: string } }) => void;
  label?: string;
  placeholder?: string;
  shouldUnregister?: boolean;
  multiline?: boolean,
  rows?: number
};

export type InputSelectProps = {
  name: string;
  id?: string;
  required?: boolean;
  useNameAsId?: boolean;
  defaultValue?: string | number;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: Control<any>;
  options: SelectOptionProps[];
  label: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  onBlur?: FocusEventHandler<any>;
  onChange?: Function;
  disabled?: boolean;
};

export type SelectOptionProps = {
  label: string,
  value: any,
};

type GenericInputDateProps = {
  locale: string,
  disableOpenPicker?: boolean,
} & InputTextProps;

export type InputDateProps = {
  onDateChange?: (value: Dayjs) => void,
} & GenericInputDateProps;

export type InputDateRangeProps = {
  onDateChange?: (values: DateRange<Dayjs>) => void,
} & GenericInputDateProps;
