import { CheckboxOptionType, Col, Form, Radio } from 'antd';

type Props = {
  name: string;
  label: string;
  options?: (string | number | CheckboxOptionType<any>)[] | undefined;
};

export const FormInputRadio = ({ label, name, options }: Props) => {
  return (
    <Col>
      <Form.Item label={label} name={name}>
        <Radio.Group
          optionType='button'
          buttonStyle='solid'
          size='small'
          options={options}
        />
      </Form.Item>
    </Col>
  );
};
