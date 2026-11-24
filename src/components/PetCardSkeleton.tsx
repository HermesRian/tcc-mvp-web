import { Box, Skeleton, Card, CardContent } from '@mui/material';

export const PetCardSkeleton = () => {
  return (
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
      {[1, 2, 3].map((item) => (
        <Card key={item}>
          <Skeleton variant="rectangular" height={300} />
          <CardContent>
            <Skeleton />
            <Skeleton width="60%" />
            <Skeleton width="40%" sx={{ mt: 2 }} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

