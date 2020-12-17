import React from 'react'
import styles from './index.less'

import Second from '@@/pages/Second'

const App = () => {
  return (
    <div className={styles.test}>
      测试
      <Second a="1" b="2" />
    </div>
  )
}

export default App
