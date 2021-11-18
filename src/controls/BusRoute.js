import { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AppContext } from '../contexts/App';

const BusRoute = () => {
  const { selectedBusStops, calculateShortestRoute, calculateSubRoutes } =
    useContext(AppContext);
  return (
    <Box p={1}>
      <TextField
        InputProps={{
          readOnly: true,
        }}
        margin="normal"
        label="Departure Bus Stop"
        value={
          selectedBusStops[0] ? selectedBusStops[0].description : 'Not Selected'
        }
        fullWidth
      />
      <TextField
        margin="normal"
        InputProps={{
          readOnly: true,
        }}
        label="Arrival Bus Stop"
        value={
          selectedBusStops[1] ? selectedBusStops[1].description : 'Not Selected'
        }
        fullWidth
      />
      <Button
        variant="outlined"
        fullWidth
        disabled={!selectedBusStops[1]}
        onClick={() => {
          calculateShortestRoute();
          calculateSubRoutes();
        }}
      >
        Calculate
      </Button>
    </Box>
  );
};
export default BusRoute;
