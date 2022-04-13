import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import MessageService from '../../../i18n/messages/MessageService';
import ActionStyle from '../../../lib/plume-admin-theme/action/ActionStyle';
import {
  PopinCloseWithoutSavingProps,
  PopinProps
} from '../../../lib/plume-admin-theme/popin/PopinProps';
import { ActionButton, ActionsContainer } from '../action/Actions';

export function Popin({
  children, zIndex, height, width
}: PopinProps) {
  return (
    <div className="popin" style={{ zIndex: zIndex ?? 100 }}>
      <div className="popin-container" style={{ height, width }}>
        {children}
      </div>
    </div>
  );
}

export function PopinCloseWithoutSaving(
  { title, confirmCloseWithoutSaving, closeWithoutSavingAction }: PopinCloseWithoutSavingProps,
) {
  const messages = getGlobalInstance(MessageService).t();

  return confirmCloseWithoutSaving.shouldAskConfirmation
    ? (
      <Popin zIndex={101}>
        <div className="popin-title">
          {title}
        </div>
        <div className="popin-message">
          {messages.message.unsaved_data}
        </div>
        <ActionsContainer>
          <ActionButton
            style={ActionStyle.DANGER}
            onClick={confirmCloseWithoutSaving.confirm(closeWithoutSavingAction)}
          >
            {messages.action.close_without_saving}
          </ActionButton>
          <ActionButton
            style={ActionStyle.SECONDARY}
            onClick={confirmCloseWithoutSaving.reset}
          >
            {messages.action.keep_editing}
          </ActionButton>
        </ActionsContainer>
      </Popin>
    )
    : null;
}
