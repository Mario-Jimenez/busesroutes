import instance from './AxiosInstance';

const findAllGeoJson = () => instance.get('/bus/stop/');

export default findAllGeoJson;
