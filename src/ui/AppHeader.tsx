import {
  CustomerServiceOutlined,
  HomeOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { Menu, Space, Switch, Typography } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

const { Title } = Typography;

interface IProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const AppHeader = ({ isDarkMode, toggleTheme }: IProps) => {
  const location = useLocation();
  const selectedKey = location.pathname === '/support' ? 'support' : 'home';

  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
        boxShadow: '0 1px 4px rgba(0, 0, 0, 0.12)',
      }}
    >
      <Title
        level={4}
        style={{ margin: '0 20px 0 0', color: isDarkMode ? 'white' : 'black' }}
      >
        My App
      </Title>

      <Menu
        mode='horizontal'
        selectedKeys={[selectedKey]}
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
        }}
        items={[
          {
            key: 'home',
            icon: <HomeOutlined />,
            label: <Link to='/'>Home</Link>,
          },
          {
            key: 'support',
            icon: <CustomerServiceOutlined />,
            label: <Link to='/support'>Support</Link>,
          },
        ]}
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
