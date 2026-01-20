import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTimeEntries } from '../context/TimeEntriesContext';
import './TimeTracking.css';

const TimeTracking: React.FC = () => {
  const { user, logout } = useAuth();
  const { addEntry, getEntriesByDate, deleteEntry } = useTimeEntries();
  
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const entries = getEntriesByDate(user!.id, selectedDate);

  const calculateDuration = (start: string, end: string): string => {
    const [startHour, startMin] = start.split(':').map(Number);
    const [endHour, endMin] = end.split(':').map(Number);
    
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;
    const diff = endMinutes - startMinutes;
    
    if (diff < 0) return '0h 0m';
    
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return `${hours}h ${minutes}m`;
  };

  const getTotalHours = (): string => {
    let totalMinutes = 0;
    
    entries.forEach((entry) => {
      const [startHour, startMin] = entry.startTime.split(':').map(Number);
      const [endHour, endMin] = entry.endTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMin;
      const endMinutes = endHour * 60 + endMin;
      totalMinutes += endMinutes - startMinutes;
    });
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!startTime || !endTime || !description) {
      setError('Bitte alle Felder ausfüllen');
      return;
    }

    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const startMinutes = startHour * 60 + startMin;
    const endMinutes = endHour * 60 + endMin;

    if (endMinutes <= startMinutes) {
      setError('Endzeit muss nach Startzeit liegen');
      return;
    }

    addEntry({
      userId: user!.id,
      date: selectedDate,
      startTime,
      endTime,
      description
    });

    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Eintrag wirklich löschen?')) {
      deleteEntry(id);
    }
  };

  return (
    <div className="time-tracking-container">
      <header className="header">
        <div className="header-content">
          <h1>Zeiterfassung</h1>
          <div className="user-info">
            <span>Willkommen, {user!.name}</span>
            <button onClick={logout} className="btn-logout">
              Abmelden
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="time-entry-form">
          <h2>Neue Zeiterfassung</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="date">Datum:</label>
                <input
                  type="date"
                  id="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startTime">Von:</label>
                <input
                  type="time"
                  id="startTime"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endTime">Bis:</label>
                <input
                  type="time"
                  id="endTime"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Beschreibung:</label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Was haben Sie gemacht?"
              />
            </div>
            {error && <div className="error-message">{error}</div>}
            <button type="submit" className="btn-primary">
              Eintrag hinzufügen
            </button>
          </form>
        </div>

        <div className="time-entries-list">
          <div className="list-header">
            <h2>Einträge für {selectedDate}</h2>
            <div className="total-hours">
              Gesamt: <strong>{getTotalHours()}</strong>
            </div>
          </div>

          {entries.length === 0 ? (
            <p className="no-entries">Keine Einträge für diesen Tag</p>
          ) : (
            <div className="entries">
              {entries.map((entry) => (
                <div key={entry.id} className="entry-card">
                  <div className="entry-time">
                    {entry.startTime} - {entry.endTime}
                    <span className="duration">
                      ({calculateDuration(entry.startTime, entry.endTime)})
                    </span>
                  </div>
                  <div className="entry-description">{entry.description}</div>
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="btn-delete"
                    aria-label="Eintrag löschen"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TimeTracking;
