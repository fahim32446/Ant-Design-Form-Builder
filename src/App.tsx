import { ConfigProvider, Layout, theme } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Home from './modules/home/Home';
import { AppHeader } from './ui/AppHeader';

const { defaultAlgorithm, darkAlgorithm } = theme;

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          colorSuccess: '#52c41a',
          colorWarning: '#faad14',
          colorError: '#ff4d4f',
          colorInfo: '#1677ff',
          wireframe: false,
        },
        components: {
          Layout: {
            headerBg: isDarkMode ? '#141414' : '#ffffff',
            headerColor: isDarkMode ? 'rgba(255, 255, 255, 0.85)' : 'rgba(0, 0, 0, 0.85)',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <Content
          style={{
            padding: '24px',
            maxWidth: '1600px',
            margin: '0 auto',
            width: '100%',
          }}
        >
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
