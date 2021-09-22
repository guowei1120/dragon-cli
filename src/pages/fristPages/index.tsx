import React from 'react';
// import { add } from '@@/utils/index';
import { useHistory } from 'react-router-dom';
import styles from './index.less';

export default () => {
	const history = useHistory();

	return (
		<div className={styles.container}>
			<button
				onClick={() => {
					history.push('/secondPage');
				}}
			>
				提交
			</button>
			第一个页面
			<input type='text' />
		</div>
	);
};
