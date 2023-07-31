module.exports = {
    //运行环境
    "env": {
        "browser": true,//浏览器端
        "es2021": true//es2021
    },
    //规则继承
    "extends": [
        //全部规贝则里默以是关闭的，eslint:recommended配置项开启推荐规则，推荐规则参照文档
        //比如：函数不能重名、对象不能出现重复key
        "eslint:recommended",
        //vue3语法规则
        "plugin:@typescript-eslint/recommended",
        //ts语法规则
        "plugin:vue/vue3-essential"
    ],
    //要为特定类型的文件指定处理器
    "overrides": [
        // {
        //     "env": {
        //         "node": true
        //     },
        //     "files": [
        //         ".eslintrc.{js,cjs}"
        //     ],
        //     "parserOptions": {
        //         "sourceType": "script"
        //     }
        // }
    ],
    //指定解析器：解析器
    //Esprima默认解析器
    //Babe1-ESLint babel解析器
    //@typescript-eslint/parser ts解析器
    "parser":"@typescript-eslint/parser",
    //指定解析器选项
    "parserOptions": {
        "ecmaVersion": "latest",//校验ECMA最新版本
        //"parser": "@typescript-eslint/parser",
        "sourceType": "module"//设置为"script"(默认)，或者"module"代码在ECMAScr ipt模块中
    },
    //ESLint支持使用第三方插件。在使用插件之前，您必须使用npm安装它
    //该es1int-plugin-前缀可以从插件名称被省略
    "plugins": [
        "@typescript-eslint",
        "vue"
    ],
    //eslint规则
    "rules": {
    }
}
