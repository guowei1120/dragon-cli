import type { AppEnvironment } from '../types';

interface ParamsIProps {
	test: { a: string; b: number };
}

type ParamsKey = keyof ParamsIProps;

/**
 * @description 需要根据部署环境部署，来配置的参数
 */
export const paramsByEnv: Map<AppEnvironment, ParamsIProps> = new Map([
	['local', { test: { a: '1', b: 2 } }],
	['qa', { test: { a: '1', b: 2 } }],
	['staging', { test: { a: '1', b: 2 } }],
	['production', { test: { a: '1', b: 2 } }],
]);

/**
 * @description 根据key，获取配置的参数
 */
export const getParamsByEnv = <T extends ParamsKey>(key: ParamsKey): ParamsIProps[T] => {
	if (!key) {
		return undefined;
	}
	return paramsByEnv.get(window.APP_ENV)?.[key];
};
