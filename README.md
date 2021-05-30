# Сборка task-менеджера Gulp и заготовки для верстки

## Верстка
 *  ***Часто использованные javascript скрипты***
 *  ***SCSS стуктура и заготовки***

### Перенаправление для перехода в index.html внутри проекта
[GitHub Pages](https://grafit-off.github.io/GULP/) - перенаправление через 10 сек.


## Gulp включает в себя такие плагины
 *  babel/core
 *  babel/preset-env
 *  babel-loader
 *  browser-sync
 *  del
 *  gp-autoprefixer
 *  gp-clean-css
 *  gp-cli
 *  gp-file-include
 *  gp-notify
 *  gp-rename
 *  gp-sass
 *  gp-sourcemaps
 *  gp-svg-sprite
 *  gp-tinypng-compress
 *  gp-ttf2woff
 *  gp-ttf2woff2
 *  gp-uglify-es
 *  gp-util
 *  node-sass
 *  del
 *  vinyl-ftp

 _Единственный таск - tinyPNG_

```js
const tinypng = () => {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg'])
		.pipe(tiny({
			key: 'KEY',
			log: true
		}))
		.pipe(dest('./src/img'))
		.pipe(dest('./build/img'))
		.pipe(dest('./app/img'))
}
exports.tinypng = tinypng;
```
