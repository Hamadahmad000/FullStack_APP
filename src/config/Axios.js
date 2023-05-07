import axios from 'axios';
// import {BASE_URL} from 'react-native-dotenv';
const route = axios.create({baseURL: 'http://192.168.10.3:8080'});

export {route};
