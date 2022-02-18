import dayjs from 'dayjs';
import { SortElementProps } from '../../plume-admin-theme/list/ListProps';
import { LogApiTrimmed } from '../api/LogApiTypes';

export const DATE_DESC: SortElementProps = {
  sortKey: 'DATE_DESC',
  sortFunction: (a: LogApiTrimmed, b: LogApiTrimmed) => {
    return dayjs(a.date).diff(dayjs(b.date));
  }
}

export default function logsApiSortsList() {
  return [DATE_DESC];
}
