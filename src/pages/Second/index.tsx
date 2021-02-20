import React from 'react'
import { add } from '@@/utils'

interface IProps {
  a: string
  b: string
}

const Second: React.FC<IProps> = props => {
  console.log(add(1, 2))

  return <div>第二123123个页面</div>
}

export default Second
