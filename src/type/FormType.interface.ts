import { FormLayout } from 'antd/es/form/Form';

export interface IOptionSubmit {
  placeholder?: string;
  name?: string;
  label?: string;
  required?: false;
  className?: string;
  col?: number;
}

export interface IFormState extends IOptionSubmit {
  id: string;
  type: IComponentType;
}

export interface IFormSetting {
  layout?: FormLayout;
  variant?: 'outlined' | 'borderless' | 'filled' | 'underlined' | undefined;
  labelAlign?: 'left' | 'right';
  size?: 'small' | 'middle' | 'large';
  colon?: boolean;
  labelWrap?: boolean;
}

export type IPreview = 'PLAYGROUND' | 'PREVIEW' | 'CODE';

export const componentTypes = {
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  SWITCH: 'switch',
  DATE: 'date',
  TEXT_AREA: 'TEXT_AREA',
  RATE: 'rate',
  RADIO: 'radio',
} as const;

export type IComponentType = (typeof componentTypes)[keyof typeof componentTypes];
