import { Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Layout from './layout/Layout';
// import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Properties from './pages/properties/Properties';
import NewProperty from './pages/properties/NewProperty';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/property-list" exact element={<Properties />} />
          <Route path="/new-property" exact element={<NewProperty />} />
          {/* <Route path="/login" element={<LoginPage />} /> */}
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
