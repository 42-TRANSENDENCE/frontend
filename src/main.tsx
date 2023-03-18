import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from './layouts/App/App';
import GlobalStyles from './styles/global';
// import loadable from '@layouts/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RecoilRoot>
    <GlobalStyles />
    <App />
  </RecoilRoot>,
)
