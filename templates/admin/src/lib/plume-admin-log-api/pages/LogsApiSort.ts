import dayjs from 'dayjs';
import { SortElementProps } from '../../plume-admin-theme/list/ListProps';
import { LogApiTrimmed } from '../api/LogApiTypes';

export const DATE_DESC: SortElementProps = {
  sortKey: 'DATE_DESC',
  sortFunction: (a: LogApiTrimmed, b: LogApiTrimmed) => {
    return dayjs(a.date).diff(dayjs(b.date));
  }
}

export const DATE_ASC: SortElementProps = {
  sortKey: 'DATE_ASC',
  sortFunction: (a: LogApiTrimmed, b: LogApiTrimmed) => {
    return dayjs(b.date).diff(dayjs(a.date));
  }
}

export default function logsApiSortsList() {
  return [DATE_DESC, DATE_ASC];
}
