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
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, Col, Divider, Form, Input, Row, Segmented, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useState } from 'react';
import { IComponentType, IFormSetting, IPreview } from '../../type/FormType.interface';
import { FormComponents } from '../../ui/builder/FormComponents';
import { SortableFields } from '../../ui/builder/SortableFields';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  addComponent,
  removeComponent,
  setReorder,
} from '../../utils/redux/slice/formInformation.slice';
import Code from '../components/Code';
import FieldSetting from '../components/FieldSetting';
import FormSetting from '../components/FormSetting';

const { Title, Text } = Typography;

const App = () => {
  const dispatch = useAppDispatch();
  const formItems = useAppSelector((state) => state.filed.formItems);
  const activeId = useAppSelector((state) => state.filed.activeId);

  const [formName, setFormName] = useState('New Form');
  const [preview, setPreview] = useState<IPreview>('PLAYGROUND');

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
    dispatch(addComponent(type));
  };

  const handleRemoveComponent = (id: string) => {
    dispatch(removeComponent(id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    console.log({ active, over });

    if (active.id !== over?.id) {
      dispatch(setReorder({ activeId: active.id, overId: over?.id }));
    }
  };

  const [mainForm] = useForm();

  return (
    <div>
      <Title level={2}>Form Builder</Title>
      <Divider />

      <Row gutter={[12, 12]}>
        {/* Left sidebar with components */}
        <Col xs={24} lg={3}>
          <FormComponents handleAddComponent={handleAddComponent} />
        </Col>

        {/* Main form building area */}
        <Col lg={15}>
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
              <Code />
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
                          <SortableFields
                            key={item.id}
                            id={item.id}
                            type={item.type}
                            onRemove={handleRemoveComponent}
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

        <Col lg={6}>
          <Card size='small' title='Customize your form'>
            {activeId ? <FieldSetting /> : undefined}
            <FormSetting setFormSetting={setFormSetting} formSetting={formSetting} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default App;
