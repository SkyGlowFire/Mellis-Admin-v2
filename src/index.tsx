import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store, history } from './app/store';
import { Provider } from 'react-redux';
import { MyTheme } from './styles';
import { ThemeProvider } from '@mui/material/styles';
import { ConnectedRouter } from 'connected-react-router';
import ErrorHandler from './error/ErrorHandler';
import { StyledEngineProvider } from '@mui/material/styles';
import { ConfirmProvider } from '~/confirmWindow/ConfirmProvider';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={MyTheme}>
          <ErrorHandler>
            <StyledEngineProvider injectFirst>
              <ConfirmProvider>
                <App />
              </ConfirmProvider>
            </StyledEngineProvider>
          </ErrorHandler>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
