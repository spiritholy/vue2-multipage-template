# vue2-multipage-template

> a vue2 multipage template

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Setting

1. 你的多个入口文件名需要在`./config/pages.js`里设置
2. 然后你可以在`src/entries/`里写入口js，文件名与1的设置相同

entry的模板为

```
import createVue from '../main'

import VueComponentName from '../pages/VueComponentName'

createVue(VueComponentName)
```

最后重复该步骤就可以生成多页面应用了

更详细的说明可查看我的blog文章[基于vue-cli的webpack模板构建的一个多页应用模板](http://spiritholy.github.io/2017/03/03/%E5%9F%BA%E4%BA%8Evue-cli%E7%9A%84webpack%E6%A8%A1%E6%9D%BF%E6%9E%84%E5%BB%BA%E7%9A%84%E4%B8%80%E4%B8%AA%E5%A4%9A%E9%A1%B5%E5%BA%94%E7%94%A8%E6%A8%A1%E6%9D%BF/)
