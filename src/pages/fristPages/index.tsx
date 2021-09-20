import React from 'react';
import { add } from '@@/utils/index';
import styles from './index.less';

export default () => {
	return (
		<div className={styles.container}>
			<button
				onClick={() => {
					console.log(add(1, 2));
				}}
			>
				提交
			</button>
			9
			<input type='text' />
		</div>
	);
};
