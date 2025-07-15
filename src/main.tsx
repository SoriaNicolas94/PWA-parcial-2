import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Register from './Pages/Register.tsx';
import Posts from './Pages/Posts.tsx';
import Users from './Pages/Users.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Register />} />
          <Route path="/posts" element={<Posts />} /> {/* Pantalla de Posts */}
          <Route path="/users" element={<Users />} /> {/* Pantalla de gestión de usuarios */}
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);