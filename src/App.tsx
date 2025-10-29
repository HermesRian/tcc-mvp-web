import { useEffect, useState } from 'react';
import { PetCard } from './components/PetCard';
import { petPostService } from './services/petPostService';
import type { PetPost } from './types/PetPost';
import './App.css';

function App() {
  const [posts, setPosts] = useState<PetPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const data = await petPostService.getAllPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar os posts. Verifique se o backend está rodando.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>🐾 Pets Desaparecidos e Encontrados</h1>
          <p>Ajude a reunir pets com suas famílias</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {loading && (
            <div className="loading">
              <div className="spinner"></div>
              <p>Carregando posts...</p>
            </div>
          )}

          {error && (
            <div className="error">
              <p>⚠️ {error}</p>
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="empty">
              <p>📭 Nenhum post encontrado.</p>
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="posts-grid">
              {posts.map((post) => (
                <PetCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </main>

      <footer className="app-footer">
        <p>Dados sincronizados com Facebook via Graph API</p>
      </footer>
    </div>
  );
}

export default App;
