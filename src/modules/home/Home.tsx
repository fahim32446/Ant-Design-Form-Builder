import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Button, Card, Col, Divider, Form, Input, Row, Segmented, Space, Typography } from 'antd';
import { FormLayout, useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { FormComponents, IComponentType } from '../../ui/builder/FormComponents';
import { SortableFormItem } from '../../ui/builder/SortableFormItem';
import Code from '../components/Code';
import FormInputOption, { IOptionSubmit } from '../components/FormInputOption';
import FormSetting from '../components/FormSetting';

const { Title, Text } = Typography;

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

const App = () => {
  const [formItems, setFormItems] = useState<IFormState[]>([]);
  const [formName, setFormName] = useState('New Form');
  const [preview, setPreview] = useState<IPreview>('PLAYGROUND');

  const [activeId, setActiveId] = useState<string>();

  const [formSetting, setFormSetting] = useState<IFormSetting>({
    layout: 'vertical',
    variant: 'outlined',
    colon: false,
    labelAlign: 'right',
    labelWrap: false,
    size: 'middle',
  });

  const { colon, labelAlign, labelWrap, layout, size, variant } = formSetting;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddComponent = (type: IComponentType) => {
    const newItem: IFormState = {
      id: `${type}-${Date.now()}`,
      type: type,
      col: 12,
      label: 'Field',
    };
    setFormItems([...formItems, newItem]);
  };

  const handleRemoveComponent = (id: string) => {
    setFormItems(formItems.filter((item) => item.id !== id));
  };

  const handleEditComponent = (id: string) => {
    if (activeId == id) return setActiveId(undefined);
    setActiveId(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setFormItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const generateFormJSON = () => {
    const formConfig = {
      name: formName,
      fields: formItems.map((item, index) => ({
        id: item.id,
        type: item.type,
        order: index,
      })),
    };

    console.log('Form JSON:', formConfig);
    return formConfig;
  };

  const [mainForm] = useForm();

  return (
    <div>
      <Title level={2}>Form Builder</Title>
      <Divider />

      <Row gutter={12}>
        {/* Left sidebar with components */}
        <Col span={3}>
          <FormComponents handleAddComponent={handleAddComponent} />
        </Col>

        {/* Main form building area */}
        <Col span={15}>
          <Card
            size='small'
            title={
              <Input
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                variant='borderless'
              />
            }
            extra={
              <Segmented<string>
                options={[
                  { label: 'Playground', value: 'PLAYGROUND' },
                  { label: 'Preview', value: 'PREVIEW' },
                  { label: 'Code', value: 'CODE' },
                ]}
                value={preview}
                onChange={(value) => {
                  setPreview(value as IPreview);
                }}
              />
            }
          >
            {preview === 'CODE' ? (
              <Code formItems={formItems} />
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={(e) => handleDragEnd(e)}
              >
                <SortableContext
                  items={formItems.map((item) => item.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <Form
                    colon={colon}
                    form={mainForm}
                    labelAlign={labelAlign}
                    labelWrap={labelWrap}
                    layout={layout}
                    size={size}
                    variant={variant}
                  >
                    <Row gutter={[12, 12]}>
                      {formItems.length > 0 ? (
                        formItems.map((item) => (
                          <SortableFormItem
                            key={item.id}
                            id={item.id}
                            type={item.type}
                            onRemove={handleRemoveComponent}
                            onEdit={handleEditComponent}
                            formItems={formItems}
                            activeId={activeId}
                            preview={preview}
                          />
                        ))
                      ) : (
                        <div>
                          <Text type='secondary'>Drag components here to build your form</Text>
                        </div>
                      )}
                    </Row>
                  </Form>
                </SortableContext>
              </DndContext>
            )}
          </Card>
        </Col>

        <Col span={6}>
          <Card size='small' title='Customize your form'>
            {activeId ? (
              <FormInputOption
                formItems={formItems}
                setFormItems={setFormItems}
                activeId={activeId}
              />
            ) : undefined}
            <FormSetting setFormSetting={setFormSetting} formSetting={formSetting} />
          </Card>
        </Col>
      </Row>
      <Space>
        <Button>Cancel</Button>
        <Button type='primary' onClick={generateFormJSON}>
          Save Form
        </Button>
      </Space>
    </div>
  );
};

export default App;
