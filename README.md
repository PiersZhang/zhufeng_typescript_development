## 1. TypeScript工程化开发
- 前端工程化就是通过流程规范化、标准化提升团队协作效率
- 通过组件化、模块化提升代码质量
- 使用构建工具、自动化工具提升开发效率
- 编译 => 打包(合并) => 压缩 => 代码检查 => 测试 => 持续集成

## 2.初始化项目
```js
mkdir zhufeng_typescript_development
cd zhufeng_typescript_development
npm init
package name: (zhufeng_typescript_development)
version: (1.0.0)
description: TypeScript工程化开发
entry point: (index.js)
test command:
git repository: https://gitee.com/zhufengpeixun/zhufeng_typescript_development
keywords: typescript,react
author: zhangrenyang
license: (ISC) MIT
```

### 3. git规范和changelog
#### 3.1  良好的git commit好处
- 可以加快code review 的流程
- 可以根据git commit 的元数据生成changelog
- 可以让其它开发者知道修改的原因

#### 3.2  良好的commit
- [commitizen](https://www.npmjs.com/package/commitizen)是一个格式化commit message的工具
- [validate-commit-msg](https://www.npmjs.com/package/validate-commit-msg) 用于检查项目的 `Commit message` 是否符合格式
- [conventional-changelog-cli](https://www.npmjs.com/package/conventional-changelog-cli)可以从`git metadata`生成变更日志

- 统一团队的git commit 标准
- 可以使用`angular`的`git commit`日志作为基本规范
  - 提交的类型限制为  feat、fix、docs、style、refactor、perf、test、chore、revert等
  - 提交信息分为两部分，标题(首字母不大写，末尾不要加标点)、主体内容(描述修改内容)
- 日志提交友好的类型选择提示 使用commitize工具
- 不符合要求格式的日志拒绝提交 的保障机制
  - 需要使用`validate-commit-msg`工具
- 统一changelog文档信息生成
  - 使用`conventional-changelog-cli`工具

```js
cnpm i commitizen  validate-commit-msg conventional-changelog-cli -D
commitizen init cz-conventional-changelog --save --save-exact
git cz
```

#### 3.3 提交的格式
```js
<type>(<scope>):<subject/>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
- <type>代表某次提交的类型，比如是修复bug还是增加feature
- <scope>表示作用域，比如一个页面或一个组件
- <subject> 主题 ，概述本次提交的内容
- <body> 详细的影响内容
- <footer> 修复的bug和issue链接


|类型|含义|
|:----|:----|
|feat|新增feature|
|fix|修复bug|
|docs|仅仅修改了文档，比如README、CHANGELOG、CONTRIBUTE等|
|style|仅仅修改了空格、格式缩进、偏好等信息，不改变代码逻辑|
|refactor|代码重构，没有新增功能或修复bug|
|perf|优化相关，提升了性能和体验 |
|test|测试用例，包括单元测试和集成测试|
|chore|改变构建流程，或者添加了依赖库和工具|
|revert|回滚到上一个版本|
|ci|CI 配置，脚本文件等更新|

#### 3.4 husky
- `validate-commit-msg`可以来检查我们的commit规范
- husky可以把`validate-commit-msg`作为一个`githook`来验证提交消息


```js
cnpm i husky  validate-commit-msg --save-dev
```

```json
  "husky": {
    "hooks": {
      "commit-msg": "validate-commit-msg"
    }
  }
```

#### 3.5 生成CHANGELOG.md
- `conventional-changelog-cli` 默认推荐的 commit 标准是来自angular项目
- 参数`-i CHANGELOG.md`表示从 `CHANGELOG.md` 读取 `changelog`
- 参数 -s 表示读写 `CHANGELOG.md` 为同一文件
- 参数 -r 表示生成 changelog 所需要使用的 release 版本数量，默认为1，全部则是0

```js
cnpm i conventional-changelog-cli -D
```

```json
"scripts": {
    "changelogs": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0"
}
```

### 4. 代码规范
- 规范的代码可以促进团队合作
- 规范的代码可以降低维护成本
- 规范的代码有助于 code review(代码审查)

#### 4.1 常见的代码规范文档
- [airbnb中文版](https://github.com/lin-123/javascript)
- [standard中文版](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)
- [百度前端编码规范](https://github.com/ecomfe/spec)
- [styleguide](https://github.com/fex-team/styleguide/blob/master/css.md)
- [CSS编码规范](https://github.com/ecomfe/spec/blob/master/css-style-guide.md)

#### 4.2 代码检查
- [Eslint](https://eslint.org) 是一款插件化的 JavaScript 静态代码检查工具，ESLint 通过规则来描述具体的检查行为

##### 4.2.1 模块安装
```js
cnpm i eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
```

##### 4.2.2 eslintrc配置文件
- [英文rules](https://eslint.org/docs/rules/)
- [中文rules](https://cn.eslint.org/docs/rules/)
- 需要添加`parserOptions`以支持模块化的写法

.eslintrc.js
```js
module.exports = {
    "parser":"@typescript-eslint/parser",
    "plugins":["@typescript-eslint"],
    "rules":{
        "no-var":"error",
        "no-extra-semi":"error",
        "@typescript-eslint/indent":["error",2]
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
          "modules": true
        }
    }
}
```


##### 4.2.3 代码检查

package.json
```json
"scripts": {
    "start": "webpack",
    "build": "tsc",
    "eslint": "eslint src --ext .ts",
    "eslint:fix": "eslint src --ext .ts --fix"
  }
```

src/1.ts
```js
var name2 = 'zhufeng';;;
if(true){
    let a = 10;
}
```

执行命令
```js
npm run eslint
1:1   error  Unexpected var, use let or const instead      no-var
1:23  error  Unnecessary semicolon                         no-extra-semi
1:24  error  Unnecessary semicolon                         no-extra-semi
3:1   error  Expected indentation of 2 spaces but found 4  @typescript-eslint/indent
```

##### 4.2.4 配置自动修复
- 安装vscode的[eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)插件
- 配置自动修复参数

.vscode\settings.json
```js
{
    "eslint.validate": [
        "javascript",
        "javascriptreact",
        "typescript",
        "typescriptreact"
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
  }
```

## 5. 单元测试
### 5.1 测试框架
- [mocha](https://mochajs.org/)是现在最流行的JavaScript测试框架之一，在浏览器和Node环境都可以使用。
- 所谓"测试框架"，就是运行测试的工具。通过它，可以为JavaScript应用添加测试，从而保证代码的质量

### 5.2 断言库
- 所谓"断言"，就是判断源码的实际执行结果与预期结果是否一致，如果不一致就抛出一个错误
- 所有的测试用例（it块）都应该含有一句或多句的断言。它是编写测试用例的关键。断言功能由断言库来实现，Mocha本身不带断言库，所以必须先引入断言库


#### 5.2.1 assert
-  `assert.equal` 用于判断两个值是否相等

#### 5.2.2 chai
```js
// 相等或不相等
expect(1 + 1).to.be.equal(2);
expect(1 + 1).to.be.not.equal(3);
let a = {name:'zhufeng'};let b = {name:'zhufeng'};
expect(a).to.be.deep.equal(b);

// 布尔值为true
expect(true).to.be.ok;
expect(false).to.not.be.ok;

// 类型判断
expect('zhufeng').to.be.a('string');
expect({name:'zhufeng'}).to.be.an('object');
function Person(){}
let person = new Person();
expect(person).to.be.an.instanceof(Person);

//包含
expect([1,2,3]).to.include(2);
expect('zhufeng').to.contain('zhu');
expect({ name: 'zhufeng', age: 9 }).to.include.keys('name');

// 是否为空
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// 正则匹配
expect('zhufengnodejs@126.com').to.match(/^zhufeng/);
```
> 头部是expect方法，尾部是断言方法，比如equal、a/an、ok、match等。两者之间使用to或to.be连接


### 5.3 编写测试
```js
cnpm i mocha  @types/mocha chai @types/chai ts-node @types/node  --save-dev
```

#### 5.3.1 编写功能
src\sum.ts
```js
export default function sum(x:number,y:number):number{
  return x + y;
}
```

#### 5.3.2 编写测试用例
- 通常，测试脚本与所要测试的源码脚本同名，但是后缀名为`.test.js`(表示测试)或者`.spec.js`(表示规格)
- 测试脚本里面应该包括一个或多个`describe`块，每个describe块应该包括一个或多个it块
- describe块称为"测试套件"（test suite），表示一组相关的测试。它是一个函数，第一个参数是测试套件的名称（"加法函数的测试"），第二个参数是一个实际执行的函数。
- it块称为`测试用例`，表示一个单独的测试，是测试的最小单位。它也是一个函数，第一个参数是测试用例的名称（"1 加 1 应该等于 2"），第二个参数是一个实际执行的函数。

test\sum.test.ts
```js
import sum from '../src/sum';
import * as assert from 'assert';
import * as chai from 'chai'
describe('test sum',()=>{
  it('1+1=2',()=>{
    assert.equal(sum(1,1),2);
  })
  it('2+2=4',()=>{
    chai.expect(2+2).to.be.equal(4);
  })
});
```

#### 5.3.3 package.json
```diff
  "scripts": {
    "build": "npm run eslint && tsc",
    "eslint": "eslint src --ext .ts",
    "eslint:fix": "eslint src --ext .ts --fix",
    "changelogs": "conventional-changelog -p angular -i CHANGELOG.md -s -r 0",
+   "test": "mocha --require ts-node/register --watch --watch-extensions ts test/**/*"
  },
```

## 6. 持续集成
- [Travis CI](https://travis-ci.com) 提供的是持续集成服务（Continuous Integration，简称 CI）。它绑定 Github 上面的项目，只要有新的代码，就会自动抓取。然后，提供一个运行环境，执行测试，完成构建，还能部署到服务器
- 持续集成指的是只要代码有变更，就自动运行构建和测试，反馈运行结果。确保符合预期以后，再将新代码集成到主干
- 持续集成的好处在于，每次代码的小幅变更，就能看到运行结果，从而不断累积小的变更，而不是在开发周期结束时，一下子合并一大块代码

### 7.1 登录并创建项目
- [Travis CI](https://travis-ci.com) 只支持 Github,所以你要拥有`GitHub`帐号
- 该帐号下面有一个项目,面有可运行的代码,还包含构建或测试脚本
- 你需要激活了一个仓库，Travis 会监听这个仓库的所有变化

### 7.2 .travis.yml
- `Travis` 要求项目的根目录下面，必须有一个`.travis.yml`文件。这是配置文件，指定了 Travis 的行为
- 该文件必须保存在 Github 仓库里面，一旦代码仓库有新的 `Commit`，Travis 就会去找这个文件，执行里面的命令
- 这个文件采用 YAML 格式。下面是一个最简单的 Node 项目的`.travis.yml`文件
- language 字段指定了默认运行环境,[所有的语言在此](https://docs.travis-ci.com/user/languages)
- node_js: "11" 表示不执行任何脚本，状态直接设为成功

```js
language: node_js
node_js:
  - "11"
install: npm install
script:  npm test  
```
### 7.3 运行流程
#### 7.3.1 运行流程
- Travis 的运行流程很简单，任何项目都会经过两个阶段
  - install 阶段：安装依赖
  - script 阶段：运行脚本

#### 7.3.2 install
- `install`字段用来指定安装脚本  `install: npm install`
- 如果不需要安装，即跳过安装阶段，就直接设为true `install: true`

#### 7.3.3 script 
- script字段用来指定构建或测试脚本
```js
script: npm run build
```

#### 7.3.4 钩子方法
Travis 为上面这些阶段提供了7个钩子
```js
before_install  安装阶段之前执行
install 安装
before_script 脚本阶段之前执行
script 脚本阶段
aftersuccess or afterfailure 脚本成功或失败
[OPTIONAL] before_deploy 布署之前
[OPTIONAL] deploy 布署
[OPTIONAL] after_deploy 布署之后
after_script  脚本阶段之后
```

### 7.4 实战
#### 7.4.1 安装hexo
- [hexo](https://hexo.io/zh-cn/docs/)是一个快速、简洁且高效的博客框架

```js
$ npm install -g hexo-cli
```

#### 7.4.2 生成项目
```js
hexo init zfblog
cd zfblog
npm install
```

#### 7.4.3 启动项目
```js
hexo generate
hexo server
hexo deploy
```

#### 7.4.4 布署项目
```js
$ cnpm install eslint hexo-deployer-git --save
cnpm generate
cnpm deploy
```

_config.yml
```yaml
# Deployment
## Docs: https://hexo.io/docs/deployment.html
deploy:
  type: git
  repo: https://github.com/zhufengnodejs/zfblog2.git
  branch: gh-pages
  message: 
```

> https://zhufengnodejs.github.io/zfblog2

#### 7.4.5 同步仓库
- 登录[travis-ci.com](https://travis-ci.com/)选择同步仓库

![syncrepos](http://img.zhufengpeixun.cn/1.syncrepos.png)

#### 7.4.6 设置仓库环境变量
|变量名|含义|
|:----|:----|
|USERNAME|git用户名|zhufengnodejs|
|UESREMAIL|git用户邮箱|zhufengnodejs@126.com|
|GH_TOKEN|用户生成的令牌| |
|GH_REF|仓库地址|github.com/zhufengnodejs/zfblog3.git|
|GH_BRANCH|推送的pages分支|gh-pages|

![2.settings](http://img.zhufengpeixun.cn/2.settings.png)

#### 7.4.7 Github生成访问令牌 (即添加授权)
- 访问令牌的作用就是授权仓库操作权限
- Github>settings>Personal access tokens> Generate new token > Generate token> Copy Token

#### 7.4.8 .travis.yml 

```yaml
language: node_js
node_js: 
    - '11'
install:
  - npm install
script:
  - hexo g
after_script:
  - cd ./public
  - git init
  - git config user.name "${USERNAME}"
  - git config user.email "${UESREMAIL}"
  - git add -A
  - git commit -m "Update documents"
  - git push --force  "https://${GH_TOKEN}@${GH_REF}" "master:${GH_BRANCH}"
branches:
  only:
    - master
```


## 参考
- [commit_message_change_log](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)