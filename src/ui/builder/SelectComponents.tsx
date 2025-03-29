import { Button, Card, Row } from 'antd';
import { RightCircleOutlined } from '@ant-design/icons';
import { componentTypes, IComponentType } from '../../type/FormType.interface';

interface IProps {
  handleAddComponent: (type: IComponentType) => void;
}

const COMPONENTS = [
  { type: componentTypes.TEXT, label: 'Text input' },
  { type: componentTypes.NUMBER, label: 'Number input' },
  { type: componentTypes.SELECT, label: 'Select' },
  { type: componentTypes.SWITCH, label: 'Switch' },
  { type: componentTypes.DATE, label: 'Date picker' },
  { type: componentTypes.RATE, label: 'Rating' },
  { type: componentTypes.TEXT_AREA, label: 'Text area' },
  { type: componentTypes.RADIO, label: 'Radio' },
];

export const SelectComponents = ({ handleAddComponent }: IProps) => {
  return (
    <Card title='Components' size='small'>
      <Row gutter={[12, 12]} style={{ padding: 10 }}>
        {COMPONENTS.map(({ type, label }) => (
          <Button
            key={type}
            icon={<RightCircleOutlined />}
            iconPosition='end'
            style={{ background: 'rgb(60, 179, 113, 0.5)' }}
            block
            onClick={() => handleAddComponent(type)}
          >
            {label}
          </Button>
        ))}
      </Row>
    </Card>
  );
};
