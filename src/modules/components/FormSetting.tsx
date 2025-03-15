import { Divider, Form, Row } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { IFormSetting } from '../home/Home';
import { FormInputRadio } from './FormItem';

type Props = {
  setFormSetting: React.Dispatch<React.SetStateAction<IFormSetting>>;
  formSetting: IFormSetting;
};

const FormSetting = ({ setFormSetting, formSetting }: Props) => {
  const [form] = useForm();

  return (
    <>
      <Divider
        orientation='left'
        style={{ marginTop: '20px' }}
        orientationMargin={0}
      >
        Form setting
      </Divider>

      <Form
        colon={false}
        form={form}
        size='small'
        layout='inline'
        onValuesChange={(_, changes) =>
          setFormSetting((prev) => {
            return { ...prev, ...changes };
          })
        }
        initialValues={formSetting}
      >
        <Row gutter={[12, 12]}>
          <FormInputRadio
            label='Form layout :'
            name={'layout'}
            options={[
              { label: 'Horizontal', value: 'horizontal' },
              { label: 'Vertical', value: 'vertical' },
              { label: 'Inline', value: 'inline' },
            ]}
          />

          <FormInputRadio
            label='Variant :'
            name={'variant'}
            options={[
              { label: 'Outlined', value: 'outlined' },
              { label: 'Borderless', value: 'borderless' },
              { label: 'Filled', value: 'filled' },
            ]}
          />

          <FormInputRadio
            label='Colon :'
            name={'colon'}
            options={[
              { label: 'Enable', value: true },
              { label: 'Disable', value: false },
            ]}
          />

          <FormInputRadio
            label='Size :'
            name={'size'}
            options={[
              { label: 'Small', value: 'small' },
              { label: 'Middle', value: 'middle' },
              { label: 'Large', value: 'large' },
            ]}
          />
          <FormInputRadio
            label='Label Wrap :'
            name={'labelWrap'}
            options={[
              { label: 'Enable', value: true },
              { label: 'Disable', value: false },
            ]}
          />

          <FormInputRadio
            label='Label Align :'
            name={'labelAlign'}
            options={[
              { label: 'Left', value: 'left' },
              { label: 'Right', value: 'right' },
            ]}
          />
        </Row>
      </Form>
    </>
  );
};

export default FormSetting;
