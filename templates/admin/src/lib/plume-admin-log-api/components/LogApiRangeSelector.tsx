import { DateRange } from '@mui/lab';
import { Dayjs } from 'dayjs';
import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PlumeAdminTheme from '../../plume-admin-theme/PlumeAdminTheme';
import useDebounce from '../../react-hook-debounce/ReactHookDebounce';

type Props = {
  onStartDateChange: (date: Dayjs | null) => void,
  onEndDateChange: (date: Dayjs | null) => void,
}

function LogApiRangeSelector({ onStartDateChange, onEndDateChange }: Props) {
  const theme = getGlobalInstance(PlumeAdminTheme);
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>();

  useDebounce(() => {
      if (dateRange) {
        onStartDateChange(dateRange[0]);
        onEndDateChange(dateRange[1]);
      }
    },
    1500,
    [dateRange]
  )

  const {
    control,
  } = useForm<{ dateRange: string }>();

  return (
    <theme.inputDateRange
      name="dateRange"
      locale={'fr'}
      control={control}
      onDateChange={setDateRange}
    />
  )
}

export default (LogApiRangeSelector);
