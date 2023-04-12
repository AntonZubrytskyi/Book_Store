import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import user from '@testing-library/user-event';
import { Provider } from 'react-redux';
import LoginPage from '../pages/LoginPage/LoginPage';
import { clientId } from '../constants';
import LoginForm from '../components/LoginForm/LoginForm';
import { setupStore } from '../redux';

describe('Login Page', () => {
  test('renders correctly', () => {
    render(
      <Provider store={setupStore()}>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <LoginPage />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>,
    );
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeInTheDocument();
  });

  test('handlers are called', async () => {
    user.setup();
    const loginHandler = jest.fn();

    render(
      <Provider store={setupStore()}>
        <GoogleOAuthProvider clientId={clientId}>
          <BrowserRouter>
            <LoginForm login={loginHandler} />
          </BrowserRouter>
        </GoogleOAuthProvider>
      </Provider>,
    );

    const loginBtn = screen.getByRole('button');
    await user.click(loginBtn);
    expect(loginHandler).toHaveBeenCalledTimes(1);
  });
});
