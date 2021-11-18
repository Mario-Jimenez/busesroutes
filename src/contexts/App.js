import React, { useEffect, useMemo, useState } from 'react';
import { useSnackbar } from 'notistack';
import findAllRoadsGeoJson from '../services/Roads';
import findAllBusStopsGeoJson from '../services/BusStops';
import {
  findShortestRouteGeoJson,
  findSubRoutesGeoJson,
} from '../services/BusRoutes';

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [roads, setRoads] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const [busStops, setbusStops] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const [shortestRoute, setShortestRoute] = useState({
    type: 'FeatureCollection',
    features: [],
  });

  const [subRoutes, setSubRoutes] = useState([]);

  const [subRoutesLayers, setSubRoutesLayers] = useState([]);

  const [selectedBusStops, setSelectedBusStops] = useState([]);

  const roadsGeoJson = async () => {
    try {
      const response = await findAllRoadsGeoJson();
      setRoads(response.data);
    } catch (err) {
      // TODO: handle error
      // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      if (err.response) {
        // client received an error response (5xx, 4xx)
        switch (err.response.status) {
          case 500: // Internal Server Error
            enqueueSnackbar('Something went wrong, please try again', {
              variant: 'error',
            });
            break;
          default:
            console.log(err.response);
        }
      } else if (err.request) {
        // client never received a response, or request never left
        enqueueSnackbar("Can't reach server", {
          variant: 'error',
        });
      } else {
        // anything else
        console.log(err);
      }
    }
  };

  const busStopsGeoJson = async () => {
    try {
      const response = await findAllBusStopsGeoJson();
      setbusStops(response.data);
    } catch (err) {
      // TODO: handle error
      // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      if (err.response) {
        // client received an error response (5xx, 4xx)
        switch (err.response.status) {
          case 500: // Internal Server Error
            enqueueSnackbar('Something went wrong, please try again', {
              variant: 'error',
            });
            break;
          default:
            console.log(err.response);
        }
      } else if (err.request) {
        // client never received a response, or request never left
        enqueueSnackbar("Can't reach server", {
          variant: 'error',
        });
      } else {
        // anything else
        console.log(err);
      }
    }
  };

  const shortestRouteGeoJson = async (departureStop, arrivalStop) => {
    try {
      const response = await findShortestRouteGeoJson(
        departureStop,
        arrivalStop
      );
      setShortestRoute(response.data);
    } catch (err) {
      // TODO: handle error
      // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      if (err.response) {
        // client received an error response (5xx, 4xx)
        switch (err.response.status) {
          case 500: // Internal Server Error
            enqueueSnackbar('Something went wrong, please try again', {
              variant: 'error',
            });
            break;
          default:
            console.log(err.response);
        }
      } else if (err.request) {
        // client never received a response, or request never left
        enqueueSnackbar("Can't reach server", {
          variant: 'error',
        });
      } else {
        // anything else
        console.log(err);
      }
    }
  };

  const subRoutesGeoJson = async (departureStop, arrivalStop) => {
    try {
      const response = await findSubRoutesGeoJson(departureStop, arrivalStop);
      setSubRoutes(response.data);
    } catch (err) {
      // TODO: handle error
      // https://www.intricatecloud.io/2020/03/how-to-handle-api-errors-in-your-web-app-using-axios/
      if (err.response) {
        // client received an error response (5xx, 4xx)
        switch (err.response.status) {
          case 500: // Internal Server Error
            enqueueSnackbar('Something went wrong, please try again', {
              variant: 'error',
            });
            break;
          default:
            console.log(err.response);
        }
      } else if (err.request) {
        // client never received a response, or request never left
        enqueueSnackbar("Can't reach server", {
          variant: 'error',
        });
      } else {
        // anything else
        console.log(err);
      }
    }
  };

  const updateBusStops = (stops) => {
    setSelectedBusStops(stops);
  };

  const calculateShortestRoute = () => {
    shortestRouteGeoJson(selectedBusStops[0].id, selectedBusStops[1].id);
  };

  const calculateSubRoutes = () => {
    subRoutesGeoJson(selectedBusStops[0].id, selectedBusStops[1].id);
  };

  useEffect(() => {
    roadsGeoJson();
    busStopsGeoJson();
  }, []);

  const values = useMemo(
    () => ({
      roads,
      busStops,
      shortestRoute,
      subRoutes,
      selectedBusStops,
      subRoutesLayers,
      setSubRoutesLayers,
      calculateShortestRoute,
      calculateSubRoutes,
      updateBusStops,
    }),
    [roads, busStops, shortestRoute, selectedBusStops]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export default AppProvider;
