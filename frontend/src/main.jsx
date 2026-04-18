import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './pages/App.jsx';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider theme={{
      primaryColor: 'blue',
      fontFamily: 'Lato, sans-serif',
    }}>
      <App />
    </MantineProvider>
  </StrictMode>,
)
