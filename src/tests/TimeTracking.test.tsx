import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { TimeEntriesProvider } from '../context/TimeEntriesContext';
import App from '../App';

describe('TimeTracking Component', () => {
  const renderWithLogin = () => {
    const { rerender } = render(
      <AuthProvider>
        <TimeEntriesProvider>
          <App />
        </TimeEntriesProvider>
      </AuthProvider>
    );

    // Login first
    const usernameInput = screen.getByLabelText(/Benutzername/i);
    const passwordInput = screen.getByLabelText(/Passwort/i);
    const loginButton = screen.getByRole('button', { name: /Anmelden/i });

    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin123' } });
    fireEvent.click(loginButton);

    return { rerender };
  };

  it('renders time tracking interface', () => {
    renderWithLogin();

    expect(screen.getByRole('heading', { name: 'Zeiterfassung', level: 1 })).toBeInTheDocument();
    expect(screen.getByText(/Willkommen/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Datum/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Von/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bis/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Beschreibung/i)).toBeInTheDocument();
  });

  it('shows error for incomplete form', () => {
    renderWithLogin();

    const submitButton = screen.getByRole('button', { name: /Eintrag hinzufügen/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Bitte alle Felder ausfüllen/i)).toBeInTheDocument();
  });

  it('shows error when end time is before start time', () => {
    renderWithLogin();

    const startTimeInput = screen.getByLabelText(/Von/i);
    const endTimeInput = screen.getByLabelText(/Bis/i);
    const descriptionInput = screen.getByLabelText(/Beschreibung/i);

    fireEvent.change(startTimeInput, { target: { value: '17:00' } });
    fireEvent.change(endTimeInput, { target: { value: '09:00' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test' } });

    const submitButton = screen.getByRole('button', { name: /Eintrag hinzufügen/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Endzeit muss nach Startzeit liegen/i)).toBeInTheDocument();
  });

  it('adds a time entry', () => {
    renderWithLogin();

    const startTimeInput = screen.getByLabelText(/Von/i);
    const endTimeInput = screen.getByLabelText(/Bis/i);
    const descriptionInput = screen.getByLabelText(/Beschreibung/i);

    fireEvent.change(startTimeInput, { target: { value: '09:00' } });
    fireEvent.change(endTimeInput, { target: { value: '17:00' } });
    fireEvent.change(descriptionInput, { target: { value: 'Testing work' } });

    const submitButton = screen.getByRole('button', { name: /Eintrag hinzufügen/i });
    fireEvent.click(submitButton);

    expect(screen.getByText('Testing work')).toBeInTheDocument();
    expect(screen.getByText(/09:00 - 17:00/)).toBeInTheDocument();
  });

  it('clears form after adding entry', () => {
    renderWithLogin();

    const startTimeInput = screen.getByLabelText(/Von/i) as HTMLInputElement;
    const endTimeInput = screen.getByLabelText(/Bis/i) as HTMLInputElement;
    const descriptionInput = screen.getByLabelText(/Beschreibung/i) as HTMLInputElement;

    fireEvent.change(startTimeInput, { target: { value: '09:00' } });
    fireEvent.change(endTimeInput, { target: { value: '17:00' } });
    fireEvent.change(descriptionInput, { target: { value: 'Testing' } });

    const submitButton = screen.getByRole('button', { name: /Eintrag hinzufügen/i });
    fireEvent.click(submitButton);

    expect(startTimeInput.value).toBe('');
    expect(endTimeInput.value).toBe('');
    expect(descriptionInput.value).toBe('');
  });

  it('shows no entries message initially', () => {
    renderWithLogin();

    expect(screen.getByText(/Keine Einträge für diesen Tag/i)).toBeInTheDocument();
  });
});
