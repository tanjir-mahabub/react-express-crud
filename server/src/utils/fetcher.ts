import axios from 'axios';
import config from '../config'; 

export const fetchProductsFromDummyAPI = async () => {
    const { data } = await axios.get(config.dummyJsonApi);
    return data.products;
};
