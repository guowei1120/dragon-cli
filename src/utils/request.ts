import Axios from 'axios';
import apiMaps from '../../config/api.config';

const { apiServer } = apiMaps.get(window.APP_ENV);

const codeWhiteList = [0, 200];

/**
 * 请求结果格式化
 *
 * @param {any} value 请求结果输入
 * @returns
 */
const responseContentFormat = value => {
	const isUndefined = value === undefined;
	const isNull = value === null;

	if (isUndefined || isNull) {
		return Object.create(null);
	}

	return value;
};

const errorMessageDict = {
	400: '错误请求',
	401: '未授权',
	403: '没有相关权限，请联系管理员',
	404: '未找到该资源',
	405: '请求方法未允许',
	408: '请求超时',
	429: '请求频繁',
	500: '服务器端出错',
	501: '网络未实现',
	502: '网络错误',
	503: '服务不可用',
	504: '网络连接错误，请稍候重试',
	505: '不支持该请求',
};

// TODO token的获取
const sessionInfo = {
	'x-request-token': '',
	'x-user-id': '',
	'app-id': '',
	'x-system-version': '',
	'x-device-manufacturer': '',
};

const setInterceptors = instance => {
	instance.interceptors.request.use(config => {
		config.headers = { ...config.headers, ...sessionInfo };
		config.headers['x-timestamp'] = new Date().valueOf();
		return config;
	});

	instance.interceptors.response.use(
		response => {
			response.data.data = responseContentFormat(response.data.data);
			if ((response.data.status === 200 && codeWhiteList.includes(response.data.code)) || response.data.stat === 'ok') {
				return Promise.resolve(response.data);
			}
			response.data.message = response.data.message || '数据请求失败';
			return Promise.reject(response.data);
		},
		error => {
			// if (error && error.message.indexOf('timeout') >= 0) {
			// 	Toast.info('网络请求超时,请重试');
			// }
			if (!error.response) {
				error.response = { message: '网络连接异常' };
			} else {
				const { data } = error.response;
				const { items = [] } = data.data || {};
				if (items.length > 0) {
					error.response.message = `${items[0].field ? items[0].field : ''}${items[0].errorMsg}`;
				} else {
					error.response.message = error.response.data.message || errorMessageDict[error.response.status] || error.response.status;
				}
			}
			// Toast.info(error.response.message);
			return Promise.reject(error.response);
		},
	);

	return instance;
};
const apiInstance = Axios.create({ baseURL: `${apiServer}` });

export const apiRequest = setInterceptors(apiInstance);
