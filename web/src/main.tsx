import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { useRoutes, BrowserRouter } from 'react-router-dom';
import routes from '~react-pages';
import LoadingFallback from '@/components/layouts/LoadingFallback';
import Layout from '@/components/layouts/Layout';

import '@fontsource/inter';
import axios from 'axios';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { initAuth } from './utils/auth';

// eslint-disable-next-line react-refresh/only-export-components
const App = () => (
  <Suspense fallback={<LoadingFallback />}>
    <Layout>{useRoutes(routes)}</Layout>
  </Suspense>
);

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
initAuth();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CssVarsProvider>
    <CssBaseline />
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </CssVarsProvider>
);
