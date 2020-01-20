import * as axios from 'axios';

var instance = axios.create();
//instance.defaults.baseURL = 'http://10.0.2.2/api';
instance.defaults.baseURL = 'http://192.168.207.77/api';
instance.defaults.timeout = 1000*30;

export { instance as default };
