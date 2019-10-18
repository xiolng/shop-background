module.exports = {
    parser: "babel-eslint",
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    plugins: ["react"],
    settings: {
        react: {
            createClass: "createReactClass",
            pragma: "React",
            version: "detect",
            flowVersion: "0.53"
        },
        propWrapperFunctions: [
            "forbidExtraProps",
            {property: "freeze", object: "Object"},
            {property: "myFavoriteWrapper"}
        ]
    },
    parserOptions: {
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        ecmaVersion: 6,
        sourceType: "module"
    },
    extends: "standard",
    rules: {
        indent: [0, 4, {
            "SwitchCase": 1
        }], //tab缩进4格
        "no-extra-semi": "error", //禁止分号
        "eol-last": 0, //
        // allow paren-less arrow functions
        'arrow-parens': 0,
        "padded-blocks": 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        quotes: 0, //单双引号关闭检验
        "no-unused-vars": 0, //关闭检验系统变量
        "no-multiple-empty-lines": 0,
        "space-before-function-paren": [0, "always"], //es方法小括号前面禁止空格
        "object-curly-spacing": 0, //关闭对象 大括号换行检验
        "no-extra-boolean-cast": 0 //禁止不必要的bool转换
    }
};
