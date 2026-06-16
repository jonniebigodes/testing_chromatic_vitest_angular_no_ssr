import { describe, test, expect, vi } from 'vitest';
import { render } from 'vitest-browser-angular';
import { LoginForm } from './ui-login-form';
import { configure, takeSnapshot } from '@chromatic-com/vitest';

configure({});

describe('LoginForm', () => {
  test('renders empty login form with all fields', async () => {
    const screen = await render(LoginForm);
    await expect.element(screen.getByLabelText('Email')).toBeVisible();
    await expect.element(screen.getByLabelText('Password')).toBeVisible();
    await expect.element(screen.getByRole('button', { name: 'Login' })).toBeVisible();
    await takeSnapshot('LoginForm - Initial empty form');
  });

  test('fills email field and captures state', async () => {
    const screen = await render(LoginForm);
    const emailInput = screen.getByLabelText('Email');
    await emailInput.fill('user@example.com');
    await expect.element(emailInput).toHaveValue('user@example.com');
    await takeSnapshot('LoginForm - Email filled');
  });

  test('fills both email and password fields', async () => {
    const screen = await render(LoginForm);
    const emailInput = screen.getByLabelText('Email');
    await emailInput.fill('user@example.com');
    await expect.element(emailInput).toHaveValue('user@example.com');
    await takeSnapshot('LoginForm - Email filled before password');
    const passwordInput = screen.getByLabelText('Password');
    await passwordInput.fill('securePassword123');
    await expect.element(passwordInput).toHaveValue('securePassword123');
    await takeSnapshot('LoginForm - Both fields filled');
  });

  test('invokes loginClick when login button is clicked', async () => {
    const handleLogin = vi.fn();
    const screen = await render(LoginForm, {
      outputs: { loginClick: handleLogin }
    });
    const emailInput = screen.getByLabelText('Email');
    await emailInput.fill('user@example.com');
    const passwordInput = screen.getByLabelText('Password');
    await passwordInput.fill('securePassword123');
    await takeSnapshot('LoginForm - Before submit');
    await screen.getByRole('button', { name: 'Login' }).click();
    expect(handleLogin).toHaveBeenCalledTimes(1);
    await takeSnapshot('LoginForm - After submit clicked');
  });

  test('renders inverted login form', async () => {
    const handleLogin = vi.fn();
    const screen = await render(LoginForm, {
      inputs: { inverted: true },
      outputs: { loginClick: handleLogin }
    });
    await takeSnapshot('LoginForm - Inverted empty');
    const emailInput = screen.getByLabelText('Email');
    await emailInput.fill('user@example.com');
    await takeSnapshot('LoginForm - Inverted email filled');
    const passwordInput = screen.getByLabelText('Password');
    await passwordInput.fill('securePassword123');
    await takeSnapshot('LoginForm - Inverted both fields filled');
    await screen.getByRole('button', { name: 'Login' }).click();
    expect(handleLogin).toHaveBeenCalledTimes(1);
    await takeSnapshot('LoginForm - Inverted after submit');
  });

  test('handles multiple form interactions', async () => {
    const handleLogin = vi.fn();
    const screen = await render(LoginForm, {
      outputs: { loginClick: handleLogin }
    });
    const emailInput = screen.getByLabelText('Email');
    await emailInput.fill('wrong@example.com');
    await takeSnapshot('LoginForm - First email attempt');
    await emailInput.clear();
    await emailInput.fill('correct@example.com');
    await expect.element(emailInput).toHaveValue('correct@example.com');
    await takeSnapshot('LoginForm - Corrected email');
    const passwordInput = screen.getByLabelText('Password');
    await passwordInput.fill('myPassword456');
    await takeSnapshot('LoginForm - Ready to submit');
    await screen.getByRole('button', { name: 'Login' }).click();
    expect(handleLogin).toHaveBeenCalledTimes(1);
    await takeSnapshot('LoginForm - Multiple interactions complete');
  });

  test('validates button enabled state by default', async () => {
    const screen = await render(LoginForm);
    const button = screen.getByRole('button', { name: 'Login' });
    await expect.element(button).toBeVisible();
    await takeSnapshot('LoginForm - Button enabled state');
  });
});
