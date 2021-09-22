import React, { Suspense } from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const FirstPageComponent = React.lazy(() => import('@@/pages/fristPages'));
const SecondPageComponent = React.lazy(() => import('@@/pages/secondPages'));

import styles from './global.less';

const App: React.FC = () => {
	return (
		<div className={styles.appContainer}>
			<Router basename='/'>
				<Switch>
					<Route exact path='/'>
						<Suspense fallback={<div>Loading...</div>}>
							<FirstPageComponent />
						</Suspense>
					</Route>
					<Route exact path='/secondPage'>
						<Suspense fallback={<div>Loading...</div>}>
							<SecondPageComponent />
						</Suspense>
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default hot(module)(App);
