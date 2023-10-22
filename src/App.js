import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Routes, Route, useNavigate } from 'react-router-dom';
import firebaseApp from './utils/firebase';
import './styles/globals.css';
import Layout from './layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Property from './pages/properties/Property';
import Properties from './pages/properties/Properties';
import NewProperty from './pages/properties/NewProperty';
import Orders from './pages/orders/Orders';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleAuthStateChanged = () => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  };

  useEffect(handleAuthStateChanged, [navigate]);

  return (
    <div className="App">
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Layout><Dashboard /></Layout>} />
            <Route path="/daftar-properti" element={<Layout><Properties /></Layout>} />
            <Route path="/daftar-properti/:id" element={<Layout><Property isEditable={false} /></Layout>} />
            <Route path="/edit-properti/:id" element={<Layout><Property isEditable /></Layout>} />
            <Route path="/tambah-properti" element={<Layout><NewProperty /></Layout>} />
            <Route path="/daftar-pemesanan" element={<Layout><Orders /></Layout>} />
          </>
        ) : (
          <Route path="/login" element={<Login />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
