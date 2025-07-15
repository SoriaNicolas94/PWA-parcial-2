import { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  username: string;
  email: string;
  isActive: boolean;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);

  // Cargar usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Activar o desactivar un usuario
  const toggleUser = async (userId: string, currentStatus: boolean) => {
    try {
      await axios.put(`http://localhost:5000/users/${userId}`, {
        isActive: !currentStatus,
      });
      fetchUsers(); // recargar usuarios
    } catch (err) {
      console.error('Error al actualizar usuario:', err);
      alert('No se pudo cambiar el estado del usuario');
    }
  };

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      {users.map((user) => (
        <div key={user._id} style={{ marginBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <p><strong>{user.username}</strong> ({user.email})</p>
          <p>Estado: {user.isActive ? 'Activo' : 'Inactivo'}</p>
          <button onClick={() => toggleUser(user._id, user.isActive)}>
            {user.isActive ? 'Desactivar' : 'Activar'}
          </button>
        </div>
      ))}
    </div>
  );
}

