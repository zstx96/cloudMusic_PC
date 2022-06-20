module.exports = {
    printWidth: 120, //单行长度
    tabWidth: 4, //缩进长度
    useTabs: true, //使用空格代替tab缩进
    semi: false, //句末使用分号
    singleQuote: true, //使用单引号，
    endOfLine: 'auto',
    // FIXME 目前好像还不支持vue pug
    plugins: [require('prettier-plugin-tailwindcss')],
}
