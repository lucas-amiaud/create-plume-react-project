import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput';
import { TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';
import { useController } from 'react-hook-form';
import useMessages from '../../../../i18n/hooks/messagesHook';
import {
  InputDateProps,
} from '../../../../lib/plume-admin-theme/form/FormInputProps';

function InputDatePicker(
  {
    placeholder,
    label,
    name,
    id,
    useNameAsId,
    control,
    rules,
    disabled,
    defaultValue,
    onDateChange,
    autoComplete,
    showTodayButton,
    disableFuture,
    disableOpenPicker,
    locale,
  }: InputDateProps) {
  const fieldId: string = (useNameAsId ? name : (id ?? name)) || '';
  const { messages } = useMessages();

  const { field } = useController({
    name: fieldId,
    control,
    rules,
    defaultValue: defaultValue || null,
  });

  const onChangeCombined = (value: Dayjs | null) => {
    field.onChange(value);
    if (value && onDateChange) {
      onDateChange(value);
    }
  };

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={locale}>
      <DatePicker
        onChange={onChangeCombined}
        value={field.value}
        disableOpenPicker={disableOpenPicker}
        showTodayButton={showTodayButton ?? false}
        disableFuture={disableFuture ?? false}
        inputFormat={messages.format.date}
        mask={messages.format.date_mask}
        renderInput={(params: MuiTextFieldProps) => (
          <TextField
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...params}
            ref={params.inputRef}
            inputRef={field.ref}
            id={fieldId}
            name={name}
            label={label}
            inputProps={{
              ...params.inputProps,
              placeholder: placeholder || messages.format.date,
            }}
            autoComplete={autoComplete}
            disabled={disabled ?? false}
            onBlur={field.onBlur}
            required
          />
        )}
      />
    </LocalizationProvider>
  );
}

export default (InputDatePicker);
