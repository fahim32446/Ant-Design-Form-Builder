import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';
import { IFormState, IPreview } from '../../modules/home/Home';
import { componentTypes, IComponentType } from './FormComponents';
const { Option } = Select;
const { Text } = Typography;

interface IProps {
  id: string;
  type?: IComponentType;
  onRemove: (id: string) => void;
  onEdit: (id: string) => void;
  formItems: IFormState[];
  activeId: string | undefined;
  preview: IPreview;
}

export const SortableFormItem = ({
  id,
  type,
  onRemove,
  onEdit,
  formItems,
  activeId,
  preview,
}: IProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const selectedFiled = formItems?.find((item) => item.id === id);
  const active = activeId === id;

  const {
    className,
    label,
    name,
    placeholder,
    required,
    col = 12,
  } = selectedFiled || {};

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // Render different form components based on type
  const renderFormComponent = () => {
    switch (type) {
      case componentTypes.TEXT:
        return <Input placeholder={placeholder} className={className} />;
      case componentTypes.NUMBER:
        return (
          <InputNumber
            placeholder={placeholder}
            style={{ width: '100%' }}
            className={className}
          />
        );
      case componentTypes.SELECT:
        return (
          <Select className={className} placeholder={placeholder}>
            <Option value='option1'>Option 1</Option>
            <Option value='option2'>Option 2</Option>
            <Option value='option3'>Option 3</Option>
          </Select>
        );
      case componentTypes.SWITCH:
        return <Switch className={className} />;
      case componentTypes.DATE:
        return (
          <DatePicker
            className={className}
            style={{ width: '100%' }}
            placeholder={placeholder}
          />
        );
      default:
        return null;
    }
  };

  if (preview === 'PREVIEW')
    return (
      <Col lg={col}>
        <Form.Item required={required} label={label || 'Field'} name={name}>
          {renderFormComponent()}
        </Form.Item>
      </Col>
    );

  return (
    <Col lg={col}>
      <div ref={setNodeRef} style={style}>
        <Card
          styles={{
            header: { background: active ? 'rgb(60, 179, 113, 0.5)' : '' },
          }}
          title={
            <div {...attributes} {...listeners}>
              <Text strong>
                {type!.charAt(0).toUpperCase() + type!.slice(1)} Component
              </Text>
            </div>
          }
          size='small'
          extra={
            <Space>
              <Button
                size='small'
                type='text'
                onClick={() => {
                  onEdit(id);
                }}
              >
                Edit
              </Button>
              <Button
                size='small'
                type='text'
                danger
                onClick={() => onRemove(id)}
              >
                Remove
              </Button>
            </Space>
          }
        >
          <Form.Item required={required} label={label || 'Field'} name={name}>
            {renderFormComponent()}
          </Form.Item>
        </Card>
      </div>
    </Col>
  );
};
