import axios from 'axios';

export const fetchProductsFromDummyAPI = async () => {
    const { data } = await axios.get(process.env.DUMMYJSON_API || '');
    return data.products;
};
