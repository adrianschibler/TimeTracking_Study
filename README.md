# Zeiterfassungs-App (Time Tracking Application)

Eine einfache Zeiterfassungs-Applikation mit React und TypeScript.

## Features

- **Benutzer-Login**: Authentifizierung mit hardcodierten Benutzern
- **Zeiterfassung**: Erfassen Sie tägliche Arbeitszeiten mit Start, Ende und Beschreibung
- **Tagesansicht**: Sehen Sie alle Einträge für ein bestimmtes Datum
- **Automatische Berechnungen**: Dauer und Gesamtstunden werden automatisch berechnet
- **Runtime-Speicher**: Alle Daten werden im Speicher gehalten (keine Datenbank)

## Demo-Benutzer

Die Anwendung enthält drei vorkonfigurierte Benutzer

| Benutzername | Passwort | Name |
|--------------|----------|------|
| user | user123 | Test User |
| demo | demo123 | Demo User |

## Technologie-Stack

- **React 19** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool und Dev Server
- **Vitest** - Testing Framework
- **Testing Library** - Component Testing
- **CSS3** - Styling

## Installation

1. Node.js installieren (falls noch nicht vorhanden)
2. Dependencies installieren:

```bash
npm install
```

## Anwendung starten

### Entwicklungsmodus

```bash
npm run dev
```

Die Anwendung läuft dann auf [http://localhost:5173](http://localhost:5173)

```

## Tests ausführen

Die Anwendung enthält umfangreiche Tests für alle Komponenten und Kontexte.

```bash
# Tests im Watch-Modus ausführen
npm test

```

## Projektstruktur

```
src/
├── components/          # React-Komponenten
│   ├── Login.tsx       # Login-Komponente
│   ├── Login.css
│   ├── TimeTracking.tsx # Zeiterfassungs-Komponente
│   └── TimeTracking.css
├── context/            # React Context für State Management
│   ├── AuthContext.tsx # Authentifizierung
│   └── TimeEntriesContext.tsx # Zeiteinträge
├── data/               # Mock-Daten
│   └── mockData.ts     # Hardcodierte Benutzer
├── tests/              # Test-Dateien
│   ├── Login.test.tsx
│   ├── TimeTracking.test.tsx
│   ├── AuthContext.test.tsx
│   ├── TimeEntriesContext.test.tsx
│   └── setup.ts        # Test-Konfiguration
├── types.ts            # TypeScript-Typen
├── App.tsx             # Haupt-App-Komponente
└── main.tsx            # Einstiegspunkt
```

## Verwendung

1. **Anmelden**: Verwenden Sie einen der Demo-Benutzer zum Einloggen
2. **Datum wählen**: Wählen Sie ein Datum für die Zeiterfassung
3. **Zeit erfassen**: Geben Sie Startzeit, Endzeit und Beschreibung ein
4. **Eintrag hinzufügen**: Klicken Sie auf "Eintrag hinzufügen"
5. **Einträge verwalten**: Sehen Sie alle Einträge des Tages und löschen Sie bei Bedarf


