import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<{ _id: string; title: string; content: string } | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setPost(response.data.data);
        setTitle(response.data.data.title);
        setContent(response.data.data.content);
      } catch (err) {
        alert('No se pudo cargar el post');
        navigate('/posts');
      }
    };
    fetchPost();
  }, [id, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/posts/${id}`, { title, content });
      alert('Post actualizado');
      navigate('/posts');
    } catch (err) {
      alert('No se pudo actualizar el post');
    }
  };

  if (!post) return <p>Cargando...</p>;

  return (
    <div>
      <h2>Editar Post</h2>
      <form onSubmit={handleUpdate}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        /><br /><br />
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Guardar Cambios</button>
      </form>
      <button onClick={() => navigate('/posts')}>Volver</button>
    </div>
  );
}