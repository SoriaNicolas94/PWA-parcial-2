import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: { _id: string; name?: string; email?: string } | string;
  likes: ({ _id: string } | string)[]; // IDs de usuarios que dieron like
}


export default function Posts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();


  // Obtener usuario del localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Cargar posts desde el backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data.data); // Asegúrate de que la respuesta tenga una propiedad 'data' con los posts
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
        authorId: user.id, // Asegúrate de que el usuario tenga un ID
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
  const handleLike = async (postId: string, liked: boolean) => {
  if (!user) return;

  try {
    if (liked) {
      await axios.patch(`http://localhost:5000/posts/${postId}/unlike`, { userId: user.id });
    } 
    else {
      await axios.patch(`http://localhost:5000/posts/${postId}/like`, { userId: user.id });
    }
    fetchPosts();
  } catch (err) {
    console.error('Error al dar/quitar like:', err);
    alert('No se pudo actualizar el like');
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

    {posts.map((post) => {
        const liked = user && post.likes.some(
        (like) => typeof like === 'string' ? like === user.id: like._id === user.id);  
    return (
    <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <p><strong>Autor:</strong> {post.author?.name || post.author}</p>
      <p><strong>Likes:</strong> {post.likes.length}</p>
      <button onClick={() => handleLike(post._id, liked)}>
        {liked ? '👎 Dislike' : '👍 Like'}
      </button>
      <button
              onClick={() => navigate(`/posts/${post._id}`)}
              style={{ marginLeft: '10px' }}
            >
              Editar
            </button>
    </div>
  );
})}
    </div>
  );
}