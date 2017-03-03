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
