import dayjs from 'dayjs';
import { createCustomCompareSorting } from '../../../components/theme/utils/SortUtils';
import { SortElementProps } from '../../plume-admin-theme/list/sort/SortProps';
import { LogApiTrimmed } from '../api/LogApiTypes';

export const DATE_DESC: SortElementProps = {
  sortKey: 'DATE_DESC',
  sortFunction: createCustomCompareSorting<LogApiTrimmed>(
    (logApi: LogApiTrimmed) => logApi.date,
    false,
    (a, b) => dayjs(a).diff(dayjs(b)),
  ),
};

export const DATE_ASC: SortElementProps = {
  sortKey: 'DATE_ASC',
  sortFunction: createCustomCompareSorting<LogApiTrimmed>(
    (logApi: LogApiTrimmed) => logApi.date,
    true,
    (a, b) => dayjs(a).diff(dayjs(b)),
  ),
};

export default function logsApiSortsList() {
  return [DATE_DESC, DATE_ASC];
}
