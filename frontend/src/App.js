import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Ranking from "./pages/Ranking";
import Layout from "./components/Layout";
import Courses from "./pages/Courses";
import Events from "./pages/Events";
import UserProfile from "./pages/UserProfile";
import CourseDetail from "./pages/CourseDetail";
import EventDetail from "./pages/EventDetail";
import AdminPanel from "./pages/AdminPanel";

const PrivateRoute = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route
            exact
            path="/"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route
            element={
              <Layout>
                <Outlet />
              </Layout>
            }
          >
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/ranking" element={<Ranking />} />
            <Route exact path="/courses" element={<Courses />} />
            <Route exact path="/events" element={<Events />} />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/courses/:id" element={<CourseDetail />} />
            <Route exact path="/events/:id" element={<EventDetail />} />
            <Route exact path="/admin" element={<AdminPanel />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
