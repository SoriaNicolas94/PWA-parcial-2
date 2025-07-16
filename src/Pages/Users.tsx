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
      const response = await axios.get('http://localhost:5000/users');
      setUsers(response.data.data);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Activar o desactivar un usuario
  const toggleUser = async (userId: string) => {
  try {
    await axios.delete(`http://localhost:5000/users/${userId}`);
    fetchUsers();
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
  }
};

  return (
    <div>
      <h2>Gestión de Usuarios</h2>

      {users.map((user) => (
        <div key={user._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Estado:</strong> {user.isActive ? 'Activo' : 'Inactivo'}</p>
            <button onClick={() => toggleUser(user._id)}>
                {user.isActive ? 'Desactivar' : 'Activar'}
            </button>
        </div>
      ))}
    </div>
  );
}

