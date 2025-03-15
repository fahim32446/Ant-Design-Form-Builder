import { Button, Card, Space } from 'antd';

export const componentTypes = {
  TEXT: 'text',
  NUMBER: 'number',
  SELECT: 'select',
  SWITCH: 'switch',
  DATE: 'date',
} as const;

export type IComponentType =
  (typeof componentTypes)[keyof typeof componentTypes];

interface IProps {
  handleAddComponent: (type: IComponentType) => void;
}

export const FormComponents = ({ handleAddComponent }: IProps) => {
  return (
    <Card title='Components' size='small'>
      <Space direction='vertical'>
        <Button block onClick={() => handleAddComponent(componentTypes.TEXT)}>
          Text Input
        </Button>
        <Button block onClick={() => handleAddComponent(componentTypes.NUMBER)}>
          Number Input
        </Button>
        <Button block onClick={() => handleAddComponent(componentTypes.SELECT)}>
          Select Dropdown
        </Button>
        <Button block onClick={() => handleAddComponent(componentTypes.SWITCH)}>
          Switch
        </Button>
        <Button block onClick={() => handleAddComponent(componentTypes.DATE)}>
          Date Picker
        </Button>
      </Space>
    </Card>
  );
};
