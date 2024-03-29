import axios from "axios";

const instance = () => {
    return axios.create({ baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT });
};

export default instance;
