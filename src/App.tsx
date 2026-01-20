import { AuthProvider } from './context/AuthContext';
import { TimeEntriesProvider } from './context/TimeEntriesContext';
import { useAuth } from './context/AuthContext';
import Login from './components/Login';
import TimeTracking from './components/TimeTracking';
import './App.css';

function AppContent() {
  const { user } = useAuth();

  return user ? <TimeTracking /> : <Login />;
}

function App() {
  return (
    <AuthProvider>
      <TimeEntriesProvider>
        <AppContent />
      </TimeEntriesProvider>
    </AuthProvider>
  );
}

export default App;
