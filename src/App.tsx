import { Outlet, Link, useNavigate } from 'react-router-dom';


function App() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Borrar datos del usuario
    navigate('/'); // Redirigir a pantalla de registro
  };

  return (
    <div style={{ padding: '20px' }}>
      <nav style={{ marginBottom: '20px' }}>
        <Link to="/posts" style={{ marginRight: '15px' }}>📄 Posts</Link>
        <Link to="/users" style={{ marginRight: '15px' }}>👥 Usuarios</Link>
        <button onClick={handleLogout}>🚪 Salir</button>
      </nav>

      <Outlet /> {/* Aquí se cargan las rutas hijas */}
    </div>
  );
}

export default App
