import { Button, Flex } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../utils/hooks';

const Code = () => {
  const formItems = useAppSelector((state) => state.filed.formItems);

  const generatedCode = `
    import 
    { Col, DatePicker, Form,
      Input, InputNumber, Row, 
      Select, Switch, Radio,
      Rate, Flex, Button, Card
    }
    from 'antd';

    import { useForm } from 'antd/es/form/Form';

    const MyForm = () => {
      const [form] = useForm();

      const submit = (values) => {
        console.log(values);
      };

      return (
      <Card style={{ maxWidth: 950, margin: '0px auto' }}>
        <Form form={form} onFinish={submit} layout="vertical">
          <Row gutter={16}>
            ${formItems
              .map(
                (item) => `<Col lg={${item.col || 24}}>
                  <Form.Item
                    label={"${item.label}"}
                    ${item.name ? `name={"${item.name}"}` : ''}
                    ${
                      item.required
                        ? `rules={[{ required: true, message: '${item.label} is required' }]}`
                        : ''
                    }
                  >
                    ${
                      item.type === 'text'
                        ? `<Input ${item.placeholder ? `placeholder="${item.placeholder}"` : ''} ${
                            item.className ? `className="${item.className}"` : ''
                          } />`
                        : item.type === 'number'
                        ? `<InputNumber style={{ width: "100%" }} ${
                            item.placeholder ? `placeholder="${item.placeholder}"` : ''
                          } ${item.className ? `className="${item.className}"` : ''} />`
                        : item.type === 'select'
                        ? `<Select options={[
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
                        ]} ${item.placeholder ? `placeholder="${item.placeholder}"` : ''} ${
                            item.className ? `className="${item.className}"` : ''
                          } />`
                        : item.type === 'switch'
                        ? '<Switch />'
                        : item.type === 'date'
                        ? `<DatePicker style={{ width: "100%" }} ${
                            item.placeholder ? `placeholder="${item.placeholder}"` : ''
                          } ${item.className ? `className="${item.className}"` : ''} />`
                        : item.type === 'text_area'
                        ? `<Input.TextArea ${
                            item.placeholder ? `placeholder="${item.placeholder}"` : ''
                          } ${item.className ? `className="${item.className}"` : ''} />`
                        : item.type === 'radio'
                        ? `<Radio.Group options={[
                            { value: 'option-1', label: 'Option-1' },
                            { value: 'option-2', label: 'Option-2' },
                            { value: 'option-3', label: 'Option-3' },
                          ]} />`
                        : item.type === 'rate'
                        ? `<Rate ${item.className ? `className="${item.className}"` : ''} />`
                        : ``
                    }
                  </Form.Item>
                </Col>
                `
              )
              .join('')}
          </Row>
          <Flex justify='end'>
            <Button htmlType='submit' type='primary'>
              Submit
            </Button>
          </Flex>
        </Form>
      </Card>
      );
    };
  export default MyForm;`;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <Flex justify='end'>
        <Button size='small' type='primary' onClick={copyToClipboard} style={{ marginTop: '10px' }}>
          {copied ? 'Copied!' : 'Copy Code'}
        </Button>
      </Flex>
      <pre>
        <code>{generatedCode}</code>
      </pre>
    </div>
  );
};

export default Code;
