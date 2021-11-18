import instance from './AxiosInstance';

const findAllGeoJson = () => instance.get('/road/');

export default findAllGeoJson;
