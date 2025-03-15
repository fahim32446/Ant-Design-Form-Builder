import { Button } from 'antd';
import { useState } from 'react';
import { IFormState } from '../home/Home';

type Props = {
  formItems: IFormState[];
};

const Code = ({ formItems }: Props) => {
  const generatedCode = `
    import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch } from 'antd';
    import { useForm } from 'antd/es/form/Form';

    const MyForm = () => {
      const [form] = useForm();

      const submit = (values) => {
        console.log(values);
      };

      return (
        <Form form={form} onFinish={submit} layout="vertical">
          <Row gutter={16}>
            ${formItems
              .map(
                (item) => `
                <Col lg={${item.col || 24}}>
                  <Form.Item
                    label={"${item.label}"}
                    name={"${item.name}"}
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
                        ? `<Select options={[]} ${
                            item.placeholder ? `placeholder="${item.placeholder}"` : ''
                          } ${item.className ? `className="${item.className}"` : ''} />`
                        : item.type === 'switch'
                        ? '<Switch />'
                        : item.type === 'date'
                        ? `<DatePicker style={{ width: "100%" }} ${
                            item.placeholder ? `placeholder="${item.placeholder}"` : ''
                          } ${item.className ? `className="${item.className}"` : ''} />`
                        : ''
                    }
                  </Form.Item>
                </Col>
                `
              )
              .join('')}
          </Row>
        </Form>
      );
    };
  `;
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div>
      <pre>
        <code>{generatedCode}</code>
      </pre>
      <Button type='primary' onClick={copyToClipboard} style={{ marginTop: '10px' }}>
        {copied ? 'Copied!' : 'Copy Code'}
      </Button>
    </div>
  );
};

export default Code;

// export const dummy = [
//   {
//     id: 'text-1742053633691',
//     type: 'text',
//     col: 18,
//     label: 'Your name:',
//     name: 'name',
//     placeholder: 'Provide your name',
//     required: true,
//     className: 'input',
//   },
//   {
//     id: 'number-1742054061334',
//     type: 'number',
//     col: 24,
//     label: 'Monthly Income',
//     name: 'income',
//     placeholder: 'Provide your monthly income',
//     required: true,
//     className: 'input',
//   },
//   {
//     id: 'select-1742054067525',
//     type: 'select',
//     col: 24,
//     label: 'Job type',
//     name: 'job_type',
//     placeholder: 'Provide your job type',
//     required: true,
//     className: 'input',
//   },
//   {
//     id: 'switch-1742054071053',
//     type: 'switch',
//     col: 12,
//     label: 'Govt job ?',
//     name: 'govt_job',
//     className: 'input',
//   },
//   {
//     id: 'switch-1742054076981',
//     type: 'switch',
//     col: 12,
//     label: '10 years plus ?',
//     name: '10_years_plus',
//     className: 'input',
//   },
//   {
//     id: 'date-1742054081957',
//     type: 'date',
//     col: 12,
//     label: 'Start date',
//     name: 'start_date',
//     placeholder: 'Your job start date',
//     required: true,
//     className: 'input',
//   },
// ];
