import { CircularProgress, Stack, Typography } from '@mui/joy';

export default function LoadingFallback() {
  return (
    <Stack height="100vh" alignItems="center" justifyContent="center" spacing={4}>
      <CircularProgress size="lg" />
      <Typography fontStyle="italic" color="primary">
        Cargando...
      </Typography>
    </Stack>
  );
}
