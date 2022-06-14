import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';
import { ChangeEvent, FocusEvent } from 'react';
import { Control } from 'react-hook-form/dist/types/form';
import { RegisterOptions } from 'react-hook-form/dist/types/validator';

export type InputTextProps = {
  type?: string;
  name?: string;
  id?: string;
  useNameAsId?: boolean;
  autoComplete?: string;
  disabled?: boolean;
  readonly?: boolean;
  defaultValue?: string;
  rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  control: Control<any>;
  // focus event
  onBlur?: (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
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
  onBlur?: (event: FocusEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  onChange?: Function;
  disabled?: boolean;
};

export type SelectOptionProps = {
  label: string,
  value: string,
};

type GenericInputDateProps = {
  locale: string,
  disableOpenPicker?: boolean,
  disableFuture?: boolean,
  showTodayButton?: boolean,
} & InputTextProps;

export type InputDateProps = {
  onDateChange?: (value: Dayjs) => void,
} & GenericInputDateProps;

export type InputDateRangeProps = {
  onDateChange?: (values: DateRange<Dayjs>) => void,
} & GenericInputDateProps;
