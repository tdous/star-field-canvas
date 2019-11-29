const path = require('path');

const { dest, parallel, series, src, task, watch } = require('gulp');
// const rename = require('gulp-rename');
// const sass = require('gulp-sass');
// const babel = require('gulp-babel');
const webpack = require('webpack-stream');

const mode = process.env.NODE_ENV || 'development';

const JS_OUTPUT_FILE = 'StarFieldCanvas.js';

// >>> TS to JS
task('ts', async () =>
  src(path.resolve(__dirname, 'src', 'index.ts'))
    .pipe(
      webpack({
        devtool: 'source-map',
        output: {
          library: 'StarFieldCanvas',
          filename: JS_OUTPUT_FILE
        },
        mode,
        module: {
          rules: [
            {
              test: /\.tsx?$/,
              use: {
                loader: 'ts-loader'
              }
            }
          ]
        },
        resolve: {
          extensions: ['.ts', '.tsx', '.js']
        }
      }).on('error', err => console.log('WEBPACK ERROR:', err))
    )
    // .pipe(
    //   babel({
    //     presets: ['@babel/env']
    //   })
    // )
    .pipe(dest(path.resolve(__dirname, 'dist')))
);
// Watch TS
task('ts:w', () => {
  watch(path.resolve(__dirname, 'src'), series('ts'));
});
