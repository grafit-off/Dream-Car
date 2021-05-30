const { src, dest, parallel, series, watch } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const fs = require('fs');
const del = require('del');
const uglify = require('gulp-uglify-es').default;
const tiny = require('gulp-tinypng-compress');
const gutil = require('gulp-util');
const ftp = require('vinyl-ftp');


const fonts = () => {
	src('./src/fonts/**.ttf')
		.pipe(ttf2woff())
		.pipe(dest('./app/fonts/'))
	return src('./src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('./app/fonts/'))
}

const cb = () => { }

let srcFonts = './src/scss/_fonts.scss';
let appFonts = './app/fonts/';

const fontsStyle = (done) => {
	let file_content = fs.readFileSync(srcFonts);
	if (file_content == '') {
		fs.writeFile(srcFonts, '', cb);
		fs.readdir(appFonts, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(srcFonts, '@include font-face("' + fontname + '", "' + fontname + '", 400, "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
	done();
}

const svgSprites = () => {
	return src('./src/img/sprites/**.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('./app/img'))
}

const styles = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/css/'))
		.pipe(browserSync.stream());
}

const htmlInclude = () => {
	return src(['./src/*.html', '!src/_*.html'])
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./app'))
		.pipe(browserSync.stream());
}

const imgToApp = () => {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg', './src/img/**/*.svg', '!src/img/sprites/*.svg'])
		.pipe(dest('./app/img'))
}

const resources = () => {
	return src('./src/resources/**')
		.pipe(dest('./app/resources'))
}

const clean = () => {
	return del(['app/*'])
}

const scripts = () => {
	return src(['./src/js/*.js', '!./src/js/_*.js'])
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./app/js'))
		.pipe(browserSync.stream());
}

const watchFiles = () => {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	});
	watch('./src/scss/**/*.scss', styles);
	watch('./src/*.html', htmlInclude);
	watch('./src/img/**/*.jpg', imgToApp);
	watch('./src/img/**/*.png', imgToApp);
	watch('./src/img/**/*.jpeg', imgToApp);
	watch('./src/img/**/*.svg', imgToApp);
	watch('./src/img/sprites/**.svg', svgSprites);
	watch('./src/resources/**', resources);
	watch('./src/fonts/**.ttf', fonts);
	watch('./src/fonts/**.ttf', fontsStyle);
	watch('./src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;

exports.default = series(clean, parallel(htmlInclude, scripts, fonts, resources, imgToApp, svgSprites), fontsStyle, styles, watchFiles);
// -- //

// Image Compress
const tinypng = () => {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg'])
		.pipe(tiny({
			key: 'JjZJQ373hGxtHJm3tJjQBcK12Wf2Q39v',
			log: true
		}))
		.pipe(dest('./src/img'))
		.pipe(dest('./build/img'))
		.pipe(dest('./app/img'))
}
exports.tinypng = tinypng;

// Build
const fontsBuild = () => {
	src('./src/fonts/**.ttf')
		.pipe(ttf2woff())
		.pipe(dest('./build/fonts/'))
	return src('./src/fonts/**.ttf')
		.pipe(ttf2woff2())
		.pipe(dest('./build/fonts/'))
}
let srcFontsBuild = './src/scss/_fonts.scss';
let appFontsBuild = './build/fonts/';
const fontsStyleBuild = (done) => {
	let file_content = fs.readFileSync(srcFontsBuild);
	if (file_content == '') {
		fs.writeFile(srcFontsBuild, '', cb);
		fs.readdir(appFontsBuild, function (err, items) {
			if (items) {
				let c_fontname;
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(srcFontsBuild, '@include font-face("' + fontname + '", "' + fontname + '", 400);\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
	done();
}

const svgSpritesBuild = () => {
	return src('./src/img/sprites/**.svg')
		.pipe(svgSprite({
			mode: {
				stack: {
					sprite: "../sprite.svg"
				}
			}
		}))
		.pipe(dest('./build/img'))
}

const htmlIncludeBuild = () => {
	return src(['./src/*.html', '!src/_*.html'])
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(dest('./build'))
}

const imgToAppBuild = () => {
	return src(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/**/*.jpeg', './src/img/**/*.svg', '!src/img/sprites/*.svg'])
		.pipe(dest('./build/img'))
}

const resourcesBuild = () => {
	return src('./src/resources/**')
		.pipe(dest('./build/resources'))
}

const cleanBuild = () => {
	return del(['build/*'])
}

const stylesBuild = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			overrideBrowserslist: ['last 5 versions'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./build/css/'))
}

const scriptsBuild = () => {
	return src(['./src/js/*.js', '!./src/js/_*.js'])
		.pipe(fileinclude({
			prefix: '@',
			basepath: '@file'
		}))
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./build/js'))
}
exports.build = series(cleanBuild, parallel(htmlIncludeBuild, scriptsBuild, fontsBuild, resourcesBuild, imgToAppBuild, svgSpritesBuild), fontsStyleBuild, stylesBuild);
// -- //

// deploy
const deploy = () => {
	let conn = ftp.create({
		host: '',
		user: '',
		password: '',
		parallel: 10,
		log: gutil.log
	});

	let globs = [
		'app/**',
	];

	return src(globs, {
		base: './app',
		buffer: false
	})
		.pipe(conn.newer('')) // only upload newer files
		.pipe(conn.dest(''));
}
exports.deploy = deploy;
