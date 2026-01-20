import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import Login from '../components/Login';

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByLabelText(/Benutzername/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Passwort/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Anmelden/i })).toBeInTheDocument();
  });

  it('shows error for empty fields', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const submitButton = screen.getByRole('button', { name: /Anmelden/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Bitte Benutzername und Passwort eingeben/i)).toBeInTheDocument();
  });

  it('shows error for invalid credentials', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText(/Benutzername/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const submitButton = screen.getByRole('button', { name: /Anmelden/i });

    fireEvent.change(usernameInput, { target: { value: 'wronguser' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Ungültige Anmeldedaten/i)).toBeInTheDocument();
  });

  it('displays demo credentials', () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    expect(screen.getByText(/admin \/ admin123/i)).toBeInTheDocument();
    expect(screen.getByText(/user \/ user123/i)).toBeInTheDocument();
    expect(screen.getByText(/demo \/ demo123/i)).toBeInTheDocument();
  });
});
