import React from 'react';
// import { add } from '@@/utils/index';
import { useHistory } from 'react-router-dom';

export default () => {
	const history = useHistory();

	return (
		<div>
			<button
				onClick={() => {
					history.push('/');
				}}
			>
				提交
			</button>
			第二个页面
			<input type='text' />
		</div>
	);
};
