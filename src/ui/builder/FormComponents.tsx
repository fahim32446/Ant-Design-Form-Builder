import { Button, Card, Row, Space } from 'antd';
import { componentTypes, IComponentType } from '../../type/FormType.interface';

interface IProps {
  handleAddComponent: (type: IComponentType) => void;
}

export const FormComponents = ({ handleAddComponent }: IProps) => {
  return (
    <Card title='Components' size='small'>
      <Row gutter={[12, 12]} style={{ padding: 10 }}>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.TEXT)}
        >
          Text input
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.TEXT_AREA)}
        >
          Text area
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.NUMBER)}
        >
          Number input
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.SELECT)}
        >
          Select
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.SWITCH)}
        >
          Switch
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.DATE)}
        >
          Date picker
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.RATE)}
        >
          Rating
        </Button>
        <Button
          style={{ background: 'rgb(60, 179, 113, 0.5)' }}
          variant='solid'
          block
          onClick={() => handleAddComponent(componentTypes.RADIO)}
        >
          Radio
        </Button>
      </Row>
    </Card>
  );
};
