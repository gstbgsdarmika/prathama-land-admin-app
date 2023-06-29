import { Routes, Route } from 'react-router-dom';
import './styles/globals.css';
import Layout from './layout/Layout';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Properties from './pages/properties/Properties';
import NewProperty from './pages/properties/NewProperty';
import Orders from './pages/orders/Orders';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Layout><Dashboard /></Layout>} />
        <Route path="/daftar-properti" exact element={<Layout><Properties /></Layout>} />
        <Route path="/tambah-properti" exact element={<Layout><NewProperty /></Layout>} />
        <Route path="/daftar-pemesanan" exact element={<Layout><Orders /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
