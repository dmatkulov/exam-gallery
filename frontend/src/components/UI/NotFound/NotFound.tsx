import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

const primary = grey[500];

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        backgroundColor: primary,
        borderRadius: 6,
        mt: 6,
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
        404
      </Typography>
    </Box>
  );
};

export default NotFound;
