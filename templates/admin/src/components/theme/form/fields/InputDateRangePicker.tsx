import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput';
import { Icon, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';
import { useController } from 'react-hook-form';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  InputDateRangeProps,
} from '../../../../lib/plume-admin-theme/form/FormInputProps';

function InputDateRangePicker(
  {
    name,
    id,
    useNameAsId,
    control,
    rules,
    disabled,
    defaultValue,
    locale,
    onDateChange,
    showTodayButton,
    disableFuture,
  }: InputDateRangeProps,
) {
  const fieldId: string = (useNameAsId ? name : (id ?? name)) || '';
  const { messages } = useMessages();

  const { field } = useController({
    name: fieldId,
    control,
    rules,
    defaultValue: defaultValue || [],
  });

  const onCustomChange = (val: DateRange<Dayjs>, keyboardInputValue?: string) => {
    // Update the date when it has been updated using the datepicker and not the text fields
    if (!keyboardInputValue) {
      field.onChange(val);
      if (onDateChange) {
        onDateChange(val);
      }
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={locale}>
      <DateRangePicker
        startText="Debut"
        endText="Fin"
        value={field.value}
        mask={messages.format.date_mask}
        inputFormat={messages.format.date}
        showTodayButton={showTodayButton ?? false}
        disableFuture={disableFuture ?? false}
        onChange={(date: DateRange<Dayjs>, keyboardInputValue?: string) => {
          onCustomChange(date, keyboardInputValue);
        }}
        renderInput={(startProps: MuiTextFieldProps, endProps: MuiTextFieldProps) => (
          <>
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...startProps}
              type="date"
              name={name}
              id={fieldId}
              disabled={disabled ?? false}
            />
            <Icon>arrow_forward</Icon>
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...endProps}
              type="date"
              name={name}
              id={fieldId}
              disabled={disabled ?? false}
            />
          </>
        )}
      />
    </LocalizationProvider>
  );
}

export default (InputDateRangePicker);
