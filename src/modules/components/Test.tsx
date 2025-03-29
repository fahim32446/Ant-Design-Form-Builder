// import {
//   Col,
//   DatePicker,
//   Form,
//   Input,
//   InputNumber,
//   Row,
//   Select,
//   Switch,
//   Radio,
//   Rate,
//   Flex,
//   Button,
//   Card,
// } from 'antd';

// import { useForm } from 'antd/es/form/Form';

// const MyForm = () => {
//   const [form] = useForm();

//   const submit = (values: any) => {
//     console.log(values);
//   };

//   return (
//     <Card style={{ maxWidth: 950, margin: '0px auto' }}>
//       <Form form={form} onFinish={submit} layout='vertical'>
//         <Row gutter={16}>
//           <Col lg={12}>
//             <Form.Item label={'Text'} name={'text-1743270164330'}>
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item
//               label={'Number'}
//               name={'number-1743270164792'}
//               rules={[{ required: true, message: 'Number is required' }]}
//             >
//               <InputNumber style={{ width: '100%' }} />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item label={'Select'} name={'select-1743270165832'}>
//               <Select
//                 options={[
//                   {
//                     label: 'Option 1',
//                     value: 'option-1',
//                   },
//                   {
//                     label: 'Option 2',
//                     value: 'option-2',
//                   },
//                   {
//                     label: 'Option 3',
//                     value: 'option-3',
//                   },
//                 ]}
//               />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item label={'Switch'} name={'switch-1743270166408'}>
//               <Switch />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item label={'Date'} name={'date-1743270166872'}>
//               <DatePicker style={{ width: '100%' }} />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item label={'Rate'} name={'rate-1743270167328'}>
//               <Rate />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item label={'Text_area'} name={'text_area-1743270167760'}>
//               <Input.TextArea />
//             </Form.Item>
//           </Col>
//           <Col lg={12}>
//             <Form.Item label={'Radio'} name={'radio-1743270168208'}>
//               <Radio.Group
//                 options={[
//                   { value: 'option-1', label: 'Option-1' },
//                   { value: 'option-2', label: 'Option-2' },
//                   { value: 'option-3', label: 'Option-3' },
//                 ]}
//               />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Flex justify='end'>
//           <Button htmlType='submit' type='primary'>
//             Submit
//           </Button>
//         </Flex>
//       </Form>
//     </Card>
//   );
// };
// export default MyForm;

const Test = () => {
  return <div>Test</div>;
};

export default Test;
