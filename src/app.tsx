import React from 'react';
import styles from './global.less';

import first from './assets/1.jpeg';
import second from './assets/1.png';

export default () => {
	return (
		<div>
			<div className={styles.container}>123123</div>
			<div className='test'>234234231111111115345345</div>
			<img src={first} />
			<img src={second} />
		</div>
	);
};
