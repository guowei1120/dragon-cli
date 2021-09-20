export type AppEnvironment = 'local' | 'qa' | 'staging' | 'production';

declare global {
	export interface Window {
		/**
		 * 系统环境
		 */
		APP_ENV: AppEnvironment;
	}
}
