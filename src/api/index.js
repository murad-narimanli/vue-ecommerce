import axios from 'axios';

const headers = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*',
};

const instance = axios.create({
	baseURL: 'https://fakestoreapi.com/',
	headers,
});

instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

instance.interceptors.request.use(
	function (config) {
		config.headers["Authorization"] = localStorage.getItem("access_token")
			? "Bearer " + localStorage.getItem("access_token")
			: null;
		return config;
	},
	function (e) {
		return Promise.reject(e);
	}
);

export default instance;


