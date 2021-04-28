# Nuxt starter

Configured with:
 - scss
 - sitemap / robots
 - dark mode
 - cypress
 - tailwind custom colors
 - composition api
 - husky git hooks
 - eslint & style lint
 - icon using mdi
 - routes manually added to a map in routerNames plugin

## Build Setup

```bash
# install dependencies
$ npm install

# If using gitkraken run https://github.com/typicode/husky/issues/875
$ rm -rf .git/hooks && ln -s ../.husky .git/hooks

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# run cypress
$ npm run test:e2e:dev
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
