import { DateRangePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { DateRange } from '@mui/lab/DateRangePicker/RangeTypes';
import { MuiTextFieldProps } from '@mui/lab/internal/pickers/PureDateInput';
import { Icon, TextField } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';
import { useController } from 'react-hook-form';
import en from '../../../../i18n/translations/en';
import fr from '../../../../i18n/translations/fr';
import { Translations } from '../../../../i18n/translations/Translations';
import { InputDateRangeProps } from '../../../../lib/plume-admin-theme/form/FormInputProps';

function InputDateRangePicker(
  {
    name,
    id,
    useNameAsId,
    control,
    rules,
    disabled,
    defaultValue,
    onBlur,
    locale,
    onDateChange
  }: InputDateRangeProps
) {
  const fieldId: string = (useNameAsId ? name : (id ?? name)) || '';

  const { field } = useController({
    name: fieldId,
    control,
    rules,
    defaultValue: defaultValue || [],
  });

  const onBlurCombined = (value: any) => {
    field.onBlur();
    if (onBlur) {
      onBlur(value);
    }
  };

  const onCustomChange = (val: DateRange<Dayjs>, keyboardInputValue?: string) => {
    // Update the date when it has been updated using the datepicker and not the text fields
    if (!keyboardInputValue) {
      field.onChange(val);
      if (onDateChange) {
        onDateChange(val);
      }
    }
  };

  const localeMap = {
    en,
    fr,
  };

  const currentLocale: Translations = localeMap[locale as 'fr' | 'en'];

  return (
    <LocalizationProvider dateAdapter={DateAdapter} locale={currentLocale}>
      <DateRangePicker
        toolbarTitle="Sélectionner une période"
        startText="Debut"
        endText="Fin"
        value={field.value}
        onChange={(date: DateRange<Dayjs>, keyboardInputValue?: string) => {
          onCustomChange(date, keyboardInputValue);
        }}
        renderInput={(startProps: MuiTextFieldProps, endProps: MuiTextFieldProps) => (
          <>
            <TextField
              {...startProps}
              type="date"
              name={name}
              variant="filled"
              id={fieldId}
              disabled={disabled ?? false}
              onBlur={onBlurCombined}
            />
            <Icon>arrow_forward</Icon>
            <TextField
              {...endProps}
              type="date"
              name={name}
              variant="filled"
              id={fieldId}
              disabled={disabled ?? false}
              onBlur={onBlurCombined}
            />
          </>
        )}
      />
    </LocalizationProvider>
  );
}

export default (InputDateRangePicker);