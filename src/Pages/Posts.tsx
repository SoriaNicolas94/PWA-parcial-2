import { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  likes: string[]; // IDs de usuarios que dieron like
}

export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // Obtener usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Cargar posts desde el backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Error al obtener posts:', err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Crear un nuevo post
  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('Tenés que estar registrado para crear un post.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/posts', {
        title,
        content,
        author: user.username,
      });
      setTitle('');
      setContent('');
      fetchPosts(); // recargar los posts
    } catch (err) {
      console.error('Error al crear post:', err);
      alert('No se pudo crear el post');
    }
  };

  // Dar like a un post
  const handleLike = async (postId: string) => {
    if (!user) return;

    try {
      await axios.put(`http://localhost:5000/posts/${postId}/like`, {
        userId: user.id,
      });
      fetchPosts(); // recargar con likes actualizados
    } catch (err) {
      console.error('Error al dar like:', err);
      alert('No se pudo dar like');
    }
  };

  return (
    <div>
      <h2>Posts</h2>

      <form onSubmit={handleCreatePost}>
        <input
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        /><br /><br />
        <textarea
          placeholder="Contenido"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Crear Post</button>
      </form>

      <hr />

      {posts.map((post) => (
        <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Autor:</strong> {post.author}</p>
          <p><strong>Likes:</strong> {post.likes.length}</p>
          <button onClick={() => handleLike(post._id)}>👍 Like</button>
        </div>
      ))}
    </div>
  );
}