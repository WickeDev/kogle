'use strict';

import gulp from 'gulp';
import gutil from 'gulp-util';

import del from 'del';

import babel from 'gulp-babel';
import nodemon from 'gulp-nodemon';
import Cache from 'gulp-file-cache';

import browserSync from 'browser-sync';

let cache = new Cache();

const DIR = {
    SRC: 'server/public',
    DEST: 'dist/public'
};


const SRC = {
    PUBLIC: DIR.SRC + '/**/*',
    HBS: 'server/views/**/*',
    SERVER: 'server/**/*.js'
};

const DEST = {
    PUBLIC: DIR.DEST + '/',
    HBS: 'dist/views',
    SERVER: 'dist'
};

gulp.task('clean', () => {
    return del.sync([DIR.DEST]);
});

gulp.task('public', () => {
    return gulp.src(SRC.PUBLIC)
        .pipe(gulp.dest(DEST.PUBLIC));
});

gulp.task('hbs', () => {
    return gulp.src(SRC.HBS)
        .pipe(gulp.dest(DEST.HBS));
});

gulp.task('babel', () => {
    return gulp.src(SRC.SERVER)
        .pipe(cache.cache())
        .pipe(babel({
            presets: [
                "es2015",
                "stage-0"
            ]
        }))
        .pipe(cache.cache())
        .pipe(gulp.dest(DEST.SERVER));
});

gulp.task('watch', () => {
    let watcher = {
        public: gulp.watch(SRC.PUBLIC, ['public']),
        hbs: gulp.watch(SRC.HBS, ['hbs']),
        babel: gulp.watch(SRC.SERVER, ['babel'])
    };

    let notify = (event) => {
        gutil.log('File', gutil.colors.yellow(event.path), 'was', gutil.colors.magenta(event.type));
    };

    for (let key in watcher) {
        watcher[key].on('change', notify);
    }
});

gulp.task('start', ['babel'], () => {
    return nodemon({
        script: DEST.SERVER + '/main.js',
        watch: DEST.SERVER
    });
});

gulp.task('browser-sync', () => {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["dist/**/*.*"],
        port: 7000
    })
});


gulp.task('default', ['clean', 'public', 'hbs',
    'watch', 'start', 'browser-sync'], () => {
    gutil.log('Gulp is running');
});
