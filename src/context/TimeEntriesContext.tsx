import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { TimeEntry } from '../types';

interface TimeEntriesContextType {
  entries: TimeEntry[];
  addEntry: (entry: Omit<TimeEntry, 'id'>) => void;
  updateEntry: (id: string, entry: Partial<TimeEntry>) => void;
  deleteEntry: (id: string) => void;
  getEntriesByDate: (userId: string, date: string) => TimeEntry[];
}

const TimeEntriesContext = createContext<TimeEntriesContextType | undefined>(undefined);

export const TimeEntriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [entries, setEntries] = useState<TimeEntry[]>([]);

  const addEntry = (entry: Omit<TimeEntry, 'id'>) => {
    const newEntry: TimeEntry = {
      ...entry,
      id: Date.now().toString()
    };
    setEntries((prev) => [...prev, newEntry]);
  };

  const updateEntry = (id: string, updatedEntry: Partial<TimeEntry>) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === id ? { ...entry, ...updatedEntry } : entry))
    );
  };

  const deleteEntry = (id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const getEntriesByDate = (userId: string, date: string): TimeEntry[] => {
    return entries.filter((entry) => entry.userId === userId && entry.date === date);
  };

  return (
    <TimeEntriesContext.Provider
      value={{ entries, addEntry, updateEntry, deleteEntry, getEntriesByDate }}
    >
      {children}
    </TimeEntriesContext.Provider>
  );
};

export const useTimeEntries = (): TimeEntriesContextType => {
  const context = useContext(TimeEntriesContext);
  if (!context) {
    throw new Error('useTimeEntries must be used within a TimeEntriesProvider');
  }
  return context;
};
