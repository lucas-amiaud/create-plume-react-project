import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput';
import { TextField } from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';
import en from '../../../../i18n/translations/en';
import fr from '../../../../i18n/translations/fr';
import { Translations } from '../../../../i18n/translations/Translations';
import { InputDateProps } from '../../../../lib/plume-admin-theme/form/FormInputProps';

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
    disableFuture,
    showTodayButton,
    disableOpenPicker,
    locale,
  }: InputDateProps) {
  const fieldId: string = (useNameAsId ? name : (id ?? name)) || '';

  const localeMap = {
    en,
    fr,
  };

  const { field } = useController({
    name: fieldId,
    control,
    rules,
    defaultValue: defaultValue || null,
  });

  const onChangeCombined = (value: any) => {
    field.onChange(value);
    if (onDateChange) {
      onDateChange(value);
    }
  };

  const currentLocale: Translations = localeMap[locale as 'fr' | 'en'];

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={currentLocale}>
      <DateTimePicker
        onChange={onChangeCombined}
        value={field.value}
        disableOpenPicker={disableOpenPicker}
        showTodayButton={showTodayButton ?? false}
        disableFuture={disableFuture ?? false}
        inputFormat={currentLocale.format.date_hour}
        mask={currentLocale.format.date_hour_mask}
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
              placeholder: placeholder || currentLocale.format.date,
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