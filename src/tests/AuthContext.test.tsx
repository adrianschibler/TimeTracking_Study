import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import type { ReactNode } from 'react';

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  it('initial state has no user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
  });

  it('login with valid credentials', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const success = result.current.login('admin', 'admin123');
      expect(success).toBe(true);
    });

    expect(result.current.user).not.toBeNull();
    expect(result.current.user?.username).toBe('admin');
    expect(result.current.user?.name).toBe('Administrator');
  });

  it('login with invalid credentials', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      const success = result.current.login('invalid', 'wrong');
      expect(success).toBe(false);
    });

    expect(result.current.user).toBeNull();
  });

  it('logout clears user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.login('user', 'user123');
    });

    expect(result.current.user).not.toBeNull();

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
  });

  it('validates all mock users', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    const testUsers = [
      { username: 'admin', password: 'admin123' },
      { username: 'user', password: 'user123' },
      { username: 'demo', password: 'demo123' }
    ];

    testUsers.forEach((user) => {
      act(() => {
        const success = result.current.login(user.username, user.password);
        expect(success).toBe(true);
      });

      expect(result.current.user?.username).toBe(user.username);

      act(() => {
        result.current.logout();
      });
    });
  });
});
