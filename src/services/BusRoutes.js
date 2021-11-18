import instance from './AxiosInstance';

const findShortestRouteGeoJson = (departureStop, arrivalStop) =>
  instance.get(
    `/bus/route/shortest?departureStop=${departureStop}&arrivalStop=${arrivalStop}`
  );

const findSubRoutesGeoJson = (departureStop, arrivalStop) =>
  instance.get(
    `/bus/route/routes?departureStop=${departureStop}&arrivalStop=${arrivalStop}`
  );

export { findShortestRouteGeoJson, findSubRoutesGeoJson };
