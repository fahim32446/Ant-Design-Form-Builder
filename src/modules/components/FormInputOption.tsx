import {
  Col,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Slider,
  SliderSingleProps,
} from 'antd';
import { FormProps, useForm } from 'antd/es/form/Form';
import React, { useEffect } from 'react';
import { IFormState } from '../home/Home';

export interface IOptionSubmit {
  placeholder?: string;
  name?: string;
  label?: string;
  required?: false;
  className?: string;
  col?: number;
}

// export interface IFieldOption extends IOptionSubmit {
//   id: string;
// }

type Props = {
  formItems: IFormState[];
  setFormItems: React.Dispatch<React.SetStateAction<IFormState[]>>;
  activeId: string | undefined;
};

const marks: SliderSingleProps['marks'] = {
  4: '4',
  8: '8',
  12: '12',
  16: '16',
  20: '20',
  24: '24',
};

const FormInputOption = ({ formItems, setFormItems, activeId }: Props) => {
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
      setFormItems((prev) => {
        const prevOptions = prev || [];
        const exists = prevOptions.some((option) => option.id === activeId);
        if (exists) {
          return prevOptions.map((option) =>
            option.id === activeId ? { ...option, ...body } : option
          );
        } else {
          return [...prevOptions, body];
        }
      });
    }
  };

  useEffect(() => {
    if (selected) {
      optionForm.setFieldsValue({ ...selected });
    }
  }, [selected]);

  return (
    <>
      <Divider
        orientation='left'
        style={{ margin: '0px 0px 15px 0px' }}
        orientationMargin={0}
      >
        Filed setting
      </Divider>

      <Form
        onValuesChange={(_, changes) => optionSubmit(changes)}
        form={optionForm}
        layout='vertical'
      >
        <Row gutter={[12, 0]}>
          <Col lg={24}>
            <Form.Item<IOptionSubmit> label='Adjust field size:' name={'col'}>
              <Slider
                marks={marks}
                defaultValue={12}
                min={4}
                max={24}
                step={2}
              />
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
    </>
  );
};

export default FormInputOption;
