import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';
import { useObservable } from 'micro-observables';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import LocaleService from '../../../i18n/locale/LocaleService';
import { Locale } from '../../locale-resolver/LocaleResolver';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useDebounce from '../../react-hook-debounce/ReactHookDebounce';

type Props = {
  onStartDateChange: (date: Dayjs | null) => void,
  onEndDateChange: (date: Dayjs | null) => void,
};

function LogApiRangeSelector({ onStartDateChange, onEndDateChange }: Props) {
  const localeService: LocaleService = getGlobalInstance(LocaleService);
  const theme: PlumeAdminTheme = getGlobalInstance(PlumeAdminTheme);

  const locale: Locale = useObservable(localeService.getCurrentLocale());
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>();

  useDebounce(
    () => {
      if (dateRange) {
        onStartDateChange(dateRange[0]);
        onEndDateChange(dateRange[1]);
      }
    },
    1500,
    [dateRange],
  );

  const {
    control,
  } = useForm<{ dateRange: string }>();

  return (
    <theme.inputDateRange
      name="dateRange"
      locale={locale.code}
      control={control}
      onDateChange={setDateRange}
      disableFuture
    />
  );
}

export default (LogApiRangeSelector);
