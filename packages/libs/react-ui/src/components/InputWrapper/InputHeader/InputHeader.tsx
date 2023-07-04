import { SystemIcon } from '../../Icons';
import { Tag } from '../../Tag/Tag';
import { Label } from '../../Typography';

import { headerClass, infoClass } from './InputHeader.css';

import React, { FC } from 'react';

export interface IInputHeaderProps {
  label: string;
  htmlFor: string;
  tag?: string;
  info?: string;
}

export const InputHeader: FC<IInputHeaderProps> = ({
  label,
  htmlFor,
  tag,
  info,
}) => {
  return (
    <div className={headerClass}>
      {Boolean(label) && <Label htmlFor={htmlFor}>{label}</Label>}
      {Boolean(tag) && <Tag>{tag}</Tag>}
      {Boolean(info) && (
        <span className={infoClass}>
          {info}
          <SystemIcon.AlertCircleOutline size="sm" />
        </span>
      )}
    </div>
  );
};
