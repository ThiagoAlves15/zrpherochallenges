import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersistLogin from './feature/sessions/PersistLogin';
import OccurrencePolling from './feature/OccurrencePolling';
import Login from './feature/sessions/Login';
import Logout from './feature/sessions/Logout';
import Signup from './feature/sessions/Signup';
import Profile from './feature/sessions/Profile';
import OnuBoard from './feature/OnuBoard';
import HeroBoard from './feature/heroes/HeroBoard';
import ThreatBoard from './feature/threats/ThreatBoard';
import PrivateRoute from './feature/routes/PrivateRoute';
import PublicOnlyRoute from './feature/routes/PublicOnlyRoute';
import AppBar from './feature/AppBar';
import { Card, CardContent, Container } from '@mui/material';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header>
          <AppBar />
        </header>

        <Container>
          <Card sx={{ boxShadow: 1, mt: 4, mb: 4 }}>
            <CardContent>
              <main>
                <OccurrencePolling />

                <Routes>
                  <Route element={<PersistLogin />}>
                    <Route
                      path="/"
                      element={
                        <PrivateRoute>
                          <OnuBoard />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/signup"
                      element={
                        <PublicOnlyRoute>
                          <Signup />
                        </PublicOnlyRoute>
                      }
                    />

                    <Route
                      path="/login"
                      element={
                        <PublicOnlyRoute>
                          <Login />
                        </PublicOnlyRoute>
                      }
                    />

                    <Route
                      path="/profile"
                      element={
                        <PrivateRoute>
                          <Profile />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/logout"
                      element={
                        <PrivateRoute>
                          <Logout />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/heroes"
                      element={
                        <PrivateRoute>
                          <HeroBoard />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="/threats"
                      element={
                        <PrivateRoute>
                          <ThreatBoard />
                        </PrivateRoute>
                      }
                    />
                  </Route>
                </Routes>
              </main>
            </CardContent>
          </Card>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
