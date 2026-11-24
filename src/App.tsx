import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  Alert,
  Paper,
} from '@mui/material';
import { Pets as PetsIcon } from '@mui/icons-material';
import { PetCard } from './components/PetCard';
import { PetCardSkeleton } from './components/PetCardSkeleton';
import { petPostService } from './services/petPostService';
import type { PetPost } from './types/PetPost';
import { theme } from './theme';

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
        <AppBar position="static" elevation={1} sx={{ backgroundColor: '#ffffff', color: '#050505' }}>
          <Toolbar>
            <PetsIcon sx={{ mr: 2, fontSize: 32, color: '#1877f2' }} />
            <Box>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#050505' }}>
                Pet App
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          component="main"
          sx={{
            flex: 1,
            py: 4,
            backgroundColor: '#f0f2f5',
          }}
        >
          <Container maxWidth="lg">
            {loading && <PetCardSkeleton />}

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {!loading && !error && posts.length === 0 && (
              <Paper elevation={0} sx={{ p: 6, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  📭 Nenhum post encontrado
                </Typography>
              </Paper>
            )}

            {!loading && !error && posts.length > 0 && (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: 3,
                }}
              >
                {posts.map((post) => (
                  <PetCard key={post.id} post={post} />
                ))}
              </Box>
            )}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
