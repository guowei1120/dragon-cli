import { reject } from 'core-js/fn/promise'
import { resolve } from 'path'
import React from 'react'
import ReactDom from 'react-dom'
// import styles from './index.less'
import App from './app'
// import './index.css'

// const render = () => {
//   const container = document.createElement('div')
//   container.innerText = '123123123测试'
//   container.className = styles.test
//   const testPromise = new Promise((resolve, reject) => {
//     resolve(123123)
//   })
//   const c = [(1, 2, 3, 4)].map(item => {
//     return item * item
//   })
//   document.getElementsByTagName('body')[0].append(container)
// }

// window.onload = () => {
//   render()
// }
console.log(123123123)
const testPromise = new Promise((resolve, reject) => {})

const a = [1, 2, 3, 4].map(item => item * 2)

ReactDom.render(<App />, document.querySelector('#app'))

// {
//   "presets": [
//     [
//       "@babel/preset-env",
//       {
//         "useBuiltIns": "usage",
//         "corejs": "2"
//       }
//     ]
//   ]
// }
