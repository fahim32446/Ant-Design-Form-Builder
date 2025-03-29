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
  Radio,
  Rate,
  Select,
  Space,
  Switch,
  Typography,
} from 'antd';

import { componentTypes, IComponentType, IPreview } from '../../type/FormType.interface';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { setActiveId } from '../../utils/redux/slice/formInformation.slice';
const { Text } = Typography;

interface IProps {
  id: string;
  type?: IComponentType;
  onRemove: (id: string) => void;
  preview: IPreview;
}

export const SortableFields = ({ id, type, onRemove, preview }: IProps) => {
  const dispatch = useAppDispatch();
  const formItems = useAppSelector((state) => state.filed.formItems);
  const activeId = useAppSelector((state) => state.filed.activeId);

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const selectedFiled = formItems?.find((item) => item.id === id);
  const active = activeId === id;

  const { className, label, name, placeholder, required, col = 12 } = selectedFiled || {};

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const renderFormComponent = () => {
    switch (type) {
      case componentTypes.TEXT:
        return <Input placeholder={placeholder} className={className} />;
      case componentTypes.NUMBER:
        return (
          <InputNumber placeholder={placeholder} style={{ width: '100%' }} className={className} />
        );
      case componentTypes.SELECT:
        return (
          <Select
            className={className}
            placeholder={placeholder}
            allowClear
            options={[
              {
                label: 'Option 1',
                value: 'option-1',
              },
              {
                label: 'Option 2',
                value: 'option-2',
              },
              {
                label: 'Option 3',
                value: 'option-3',
              },
            ]}
          ></Select>
        );
      case componentTypes.SWITCH:
        return <Switch className={className} />;
      case componentTypes.DATE:
        return (
          <DatePicker className={className} style={{ width: '100%' }} placeholder={placeholder} />
        );
      case componentTypes.TEXT_AREA:
        return <Input.TextArea placeholder={placeholder} className={className} rows={3} />;
      case componentTypes.RATE:
        return <Rate className={className} />;
      case componentTypes.RADIO:
        return (
          <Radio.Group
            options={[
              { value: 'option-1', label: 'Option-1' },
              { value: 'option-2', label: 'Option-2' },
              { value: 'option-3', label: 'Option-3' },
            ]}
          />
        );
      default:
        return null;
    }
  };

  if (preview === 'PREVIEW')
    return (
      <Col span={col}>
        <Form.Item required={required} label={label || 'Field'} name={name}>
          {renderFormComponent()}
        </Form.Item>
      </Col>
    );

  const onEdit = (id: string) => {
    if (activeId == id) return dispatch(setActiveId(undefined));
    dispatch(setActiveId(id));
  };

  return (
    <Col span={col}>
      <div ref={setNodeRef} style={style}>
        <Card
          styles={{
            header: { background: active ? 'rgb(60, 179, 113, 0.5)' : '' },
          }}
          title={
            <div {...attributes} {...listeners}>
              <Text strong>{type!.charAt(0).toUpperCase() + type!.slice(1)} Component</Text>
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
              <Button size='small' type='text' danger onClick={() => onRemove(id)}>
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
