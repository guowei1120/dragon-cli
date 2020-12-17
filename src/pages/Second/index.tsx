import React from 'react'

interface IProps {
  a: string
  b: string
}

const Second: React.FC<IProps> = props => {
  return <div>第二123123个页面</div>
}

export default Second
