import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { TimeEntriesProvider, useTimeEntries } from '../context/TimeEntriesContext';
import type { ReactNode } from 'react';

describe('TimeEntriesContext', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TimeEntriesProvider>{children}</TimeEntriesProvider>
  );

  it('initial state has no entries', () => {
    const { result } = renderHook(() => useTimeEntries(), { wrapper });
    expect(result.current.entries).toEqual([]);
  });

  it('adds a new entry', () => {
    const { result } = renderHook(() => useTimeEntries(), { wrapper });

    const newEntry = {
      userId: '1',
      date: '2026-01-10',
      startTime: '09:00',
      endTime: '17:00',
      description: 'Test work'
    };

    act(() => {
      result.current.addEntry(newEntry);
    });

    expect(result.current.entries).toHaveLength(1);
    expect(result.current.entries[0].userId).toBe('1');
    expect(result.current.entries[0].description).toBe('Test work');
    expect(result.current.entries[0].id).toBeDefined();
  });

  it('deletes an entry', () => {
    const { result } = renderHook(() => useTimeEntries(), { wrapper });

    const newEntry = {
      userId: '1',
      date: '2026-01-10',
      startTime: '09:00',
      endTime: '17:00',
      description: 'Test work'
    };

    act(() => {
      result.current.addEntry(newEntry);
    });

    const entryId = result.current.entries[0].id;

    act(() => {
      result.current.deleteEntry(entryId);
    });

    expect(result.current.entries).toHaveLength(0);
  });

  it('updates an entry', () => {
    const { result } = renderHook(() => useTimeEntries(), { wrapper });

    const newEntry = {
      userId: '1',
      date: '2026-01-10',
      startTime: '09:00',
      endTime: '17:00',
      description: 'Test work'
    };

    act(() => {
      result.current.addEntry(newEntry);
    });

    const entryId = result.current.entries[0].id;

    act(() => {
      result.current.updateEntry(entryId, {
        description: 'Updated work'
      });
    });

    expect(result.current.entries[0].description).toBe('Updated work');
  });

  it('filters entries by user and date', () => {
    const { result } = renderHook(() => useTimeEntries(), { wrapper });

    act(() => {
      result.current.addEntry({
        userId: '1',
        date: '2026-01-10',
        startTime: '09:00',
        endTime: '17:00',
        description: 'User 1 work'
      });

      result.current.addEntry({
        userId: '2',
        date: '2026-01-10',
        startTime: '10:00',
        endTime: '18:00',
        description: 'User 2 work'
      });

      result.current.addEntry({
        userId: '1',
        date: '2026-01-11',
        startTime: '09:00',
        endTime: '17:00',
        description: 'User 1 next day'
      });
    });

    const user1Entries = result.current.getEntriesByDate('1', '2026-01-10');
    expect(user1Entries).toHaveLength(1);
    expect(user1Entries[0].description).toBe('User 1 work');

    const user2Entries = result.current.getEntriesByDate('2', '2026-01-10');
    expect(user2Entries).toHaveLength(1);
    expect(user2Entries[0].description).toBe('User 2 work');

    const user1NextDay = result.current.getEntriesByDate('1', '2026-01-11');
    expect(user1NextDay).toHaveLength(1);
    expect(user1NextDay[0].description).toBe('User 1 next day');
  });
});
