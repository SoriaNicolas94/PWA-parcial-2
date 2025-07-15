import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  // Estados para los inputs del formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // para redireccionar luego del registro

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Llamada POST al backend para crear el usuario
      const response = await axios.post('http://localhost:5000/users', {
        username,
        email,
      });

      const user = response.data;

      // Guardar en localStorage el usuario registrado
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: user._id,
          username: user.username,
          email: user.email,
        })
      );

      // Redirigir a la pantalla de posts
      navigate('/posts');
    } catch (error) {
      console.error('Error al registrar:', error);
      alert('No se pudo registrar el usuario. Verifica los datos o el backend.');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Registro de Usuario</h2>
      
      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      /><br /><br />
      
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      /><br /><br />

      <button type="submit">Crear Usuario</button>
    </form>
  );
}

export default Register;