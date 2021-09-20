import type { AppEnvironment } from '../types';

const apiMaps: Map<AppEnvironment, { apiServer: string }> = new Map([
	['local', { apiServer: '' }],
	['qa', { apiServer: '' }],
	['staging', { apiServer: '' }],
	['production', { apiServer: '' }],
]);

export default apiMaps;
