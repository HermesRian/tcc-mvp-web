import type { PetPost } from '../types/PetPost';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Stack,
} from '@mui/material';
import {
  CalendarToday as CalendarIcon,
  Facebook as FacebookIcon,
} from '@mui/icons-material';

interface PetCardProps {
  post: PetPost;
}

export const PetCard = ({ post }: PetCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {post.attachments.map((attachment) => (
        <Card key={attachment.id} elevation={0}>
          <CardMedia
            component="img"
            height="300"
            image={attachment.media.image.src}
            alt={attachment.description}
            sx={{
              objectFit: 'cover',
            }}
          />
          
          <CardContent>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                mb: 2,
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
              }}
            >
              {attachment.description}
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Chip
                icon={<CalendarIcon sx={{ fontSize: '0.9rem' }} />}
                label={formatDate(post.createdAt)}
                size="small"
                variant="outlined"
                color="primary"
              />
            </Box>
            
            <Stack direction="row" spacing={1}>
              <Button
                variant="contained"
                startIcon={<FacebookIcon />}
                href={attachment.url}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
                sx={{
                  background: 'linear-gradient(45deg, #1877f2 30%, #42a5f5 90%)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #145dbf 30%, #1e88e5 90%)',
                  },
                }}
              >
                Ver no Facebook
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
