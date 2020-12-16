// https://prettier.io/docs/en/options.html#trailing-commas
module.exports = {
  printWidth: 140,
  tabWidth: 2,
  trailingComma: 'es5',
  semi: false, // 使用分号
  singleQuote: true, // 使用单引号
  jsxSingleQuote: false,
  bracketSpacing: true, // 对象前后空格
  jsxBracketSameLine: false, // jsx组件=> '>'和文字的换行
  arrowParens: 'avoid', //箭头函数一个参数 (x)=>{} 转换位 x=>{}
}
