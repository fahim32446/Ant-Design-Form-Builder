import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Menu, Space, Switch, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';

const { Title } = Typography;

interface IProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const AppHeader = ({ isDarkMode, toggleTheme }: IProps) => {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Title level={4} style={{ margin: '0 20px 0 0', color: isDarkMode ? 'white' : 'black' }}>
        ANTD FORM BUILDER
      </Title>

      <Menu
        mode='horizontal'
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
        }}
      />

      <Space>
        <Switch
          checked={isDarkMode}
          onChange={toggleTheme}
          checkedChildren={<MoonOutlined />}
          unCheckedChildren={<SunOutlined />}
        />
      </Space>
    </Header>
  );
};
