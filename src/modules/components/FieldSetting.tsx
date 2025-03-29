import { Card, Col, Form, Input, Row, Select, Slider, SliderSingleProps } from 'antd';
import { FormProps, useForm } from 'antd/es/form/Form';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { setFormItemsChange } from '../../utils/redux/slice/formInformation.slice';
import { IFormState, IOptionSubmit } from '../../type/FormType.interface';

const marks: SliderSingleProps['marks'] = {
  4: '4',
  8: '8',
  12: '12',
  16: '16',
  20: '20',
  24: '24',
};

const FieldSetting = () => {
  const dispatch = useAppDispatch();
  const formItems = useAppSelector((state) => state.filed.formItems);
  const activeId = useAppSelector((state) => state.filed.activeId);

  const [optionForm] = useForm<IOptionSubmit>();

  const selected = formItems.find((item) => item.id === activeId);

  const optionSubmit: FormProps<IOptionSubmit>['onFinish'] = (e) => {
    if (activeId) {
      const body: IFormState = {
        ...e,
        id: activeId,
        name: e.name,
        placeholder: e.placeholder,
        type: selected?.type!,
      };

      dispatch(setFormItemsChange(body));
    }
  };

  useEffect(() => {
    if (selected) {
      optionForm.setFieldsValue({ ...selected });
    }
  }, [selected]);

  return (
    <Card
      title={'Filed setting'}
      size='small'
      styles={{
        body: { background: 'rgb(60, 179, 113, 0.1)' },
        header: { background: 'rgb(60, 179, 113, 0.5)' },
      }}
    >
      <Form
        onValuesChange={(_, changes) => optionSubmit(changes)}
        form={optionForm}
        layout='vertical'
      >
        <Row gutter={[12, 0]}>
          <Col xs={24} md={24} lg={24}>
            <Form.Item<IOptionSubmit> label='Adjust field size:' name={'col'} initialValue={12}>
              <Slider marks={marks} min={4} max={24} step={2} />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item<IOptionSubmit> label='Label:' name={'label'}>
              <Input placeholder='provide label' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<IOptionSubmit> label='Name:' name={'name'}>
              <Input placeholder='provide name' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<IOptionSubmit> label='Placeholder:' name={'placeholder'}>
              <Input placeholder='provide placeholder' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<IOptionSubmit> label='Classname:' name={'className'}>
              <Input placeholder='Provide class name' />
            </Form.Item>
          </Col>
          <Col lg={12}>
            <Form.Item<IOptionSubmit> label='Required:' name={'required'}>
              <Select
                placeholder={'Select required filed'}
                allowClear
                options={[
                  { label: 'Required', value: true },
                  { label: 'Non-required', value: false },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default FieldSetting;
