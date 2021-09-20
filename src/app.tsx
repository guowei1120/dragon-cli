import React from 'react';
import { hot } from 'react-hot-loader';
import FirstPage from '@@/pages/fristPages';

import styles from './global.less';
import first from './assets/1.jpeg';
import second from './assets/1.png';

const App: React.FC = () => {
	return (
		<div>
			<div className={styles.container}>122222233333229999999</div>
			<div className='test'>2324234234342</div>
			<img src={first} />
			<img src={second} />
			<input />
			<FirstPage />
		</div>
	);
};

export default hot(module)(App);
