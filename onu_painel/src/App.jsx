import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PersistLogin from './components/sessions/PersistLogin';
import Login from './components/sessions/Login';
import Logout from './components/sessions/Logout';
import Signup from './components/sessions/Signup';
import UpdateProfile from './components/sessions/UpdateProfile';
import OnuBoard from './components/dashboards/OnuBoard';
import PrivateRoute from './components/routes/PrivateRoute';
import PublicOnlyRoute from './components/routes/PublicOnlyRoute';
import AppBar from './components/AppBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="app-header">
          <AppBar />
        </header>

        <main>
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
                path="/logout"
                element={
                  <PrivateRoute>
                    <Logout />
                  </PrivateRoute>
                }
              />

              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
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
                path="/signup"
                element={
                  <PublicOnlyRoute>
                    <Signup />
                  </PublicOnlyRoute>
                }
              />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
