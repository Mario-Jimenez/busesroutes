import Box from '@mui/material/Box';
import { useContext } from 'react';
import { AppContext } from '../contexts/App';
import BusRoute from './BusRoute';

const ActionBar = () => {
  const { subRoutes } = useContext(AppContext);

  const routes = subRoutes.map((route) => (
    <pre>
      {`${route.description}
(${route.kilometers} Kilometers)`}
    </pre>
  ));

  return (
    <div>
      <Box p={1}>
        <BusRoute />
      </Box>
      <Box p={1}>{routes}</Box>
    </div>
  );
};

export default ActionBar;
