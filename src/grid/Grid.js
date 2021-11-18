import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import MapWrapper from '../map/Map';
import ActionBar from '../controls/ActionsBar';

const MacroGrid = () => (
  <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={0}>
      <Grid item xs={10}>
        <MapWrapper />
      </Grid>
      <Grid item xs={2}>
        <ActionBar />
      </Grid>
    </Grid>
  </Box>
);

export default MacroGrid;
