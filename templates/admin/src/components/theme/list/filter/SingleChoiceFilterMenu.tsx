import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import MessageService from '../../../../i18n/messages/MessageService';
import {
  ObjectFilterProps,
  SingleChoiceObjectFilterMenuProps,
  SingleChoiceRawFilterMenuProps,
} from '../../../../lib/plume-admin-theme/list/filter/FilterProps';

/**
 * SingleChoiceFilterMenu is a generic component for filtering in a list
 * @param filterMenuKey the key in translation file to be used
 * @param filters The filters to be displayed.
 *                Each filter must contain possible values
 *                Each filter must contain a key filter for identification
 * @param onFilterValueClicked function executed when a radio button is clicked
 * @param selectedValue the map of the current selected value by the key filter
 * @constructor
 */
function SingleChoiceFilterMenu(
  {
    filterMenuKey, filters, onFilterValueClicked, selectedValues,
  }: SingleChoiceRawFilterMenuProps,
) {
  const messages = getGlobalInstance(MessageService).t();

  return (
    <div className="list-filter-menu">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <h2>{(messages.filter as any)[filterMenuKey].title}</h2>
      <div className="list-filters">
        {
          filters.map((filterPossibility) => (
            <div key={filterPossibility.filterKey} className="filter">
              <span className="filter-title">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(messages.filter as any)[filterMenuKey][filterPossibility.filterKey]}
              </span>
              <RadioGroup
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onFilterValueClicked(filterPossibility.filterKey, e.target.value);
                }}
                value={selectedValues.get(filterPossibility.filterKey) || ''}
              >
                {
                  Array.from(new Set<string>([...filterPossibility.possibleValues]))
                    .map((value: string) => (
                      <FormControlLabel
                        key={value}
                        label={value}
                        value={value ?? null}
                        control={(
                          <Radio />
                        )}
                      />
                    ))
                }
              </RadioGroup>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default (SingleChoiceFilterMenu);

/**
 * SingleObjectChoiceFilterMenu generates a single choice filter menu for a give object type
 * @param filterMenuKey the key in translation file to be used
 * @param onFilterValueClicked function executed when a checkbox is clicked
 * @param filters The filters for the given type.
 *                Each filter must contain a key extractor of the given object
 *                Each filter must contain a key filter for identification
 * @param rawList the whole given type list to be filtered
 * @param selectedValue the map of the current selected value by the key filter
 * @constructor
 */
export function SingleObjectChoiceFilterMenu<T>(
  {
    filterMenuKey,
    onFilterValueClicked,
    filters,
    rawList,
    selectedValues,
  }: SingleChoiceObjectFilterMenuProps<T>,
) {
  return (
    <SingleChoiceFilterMenu
      filterMenuKey={filterMenuKey}
      onFilterValueClicked={onFilterValueClicked}
      filters={
        filters
          .map((o: ObjectFilterProps<T>) => ({
            filterKey: o.filterKey,
            possibleValues: rawList.map(o.keyExtractor),
          }))
      }
      selectedValues={selectedValues}
    />
  );
}
