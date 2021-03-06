//noinspection JSUnresolvedVariable
import express from 'express';
import * as path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import index from './routes/index';
import result from './routes/result';
import users from './routes/users';

class App {
    app;

    constructor() {
        this.app = express();
        this.config();
        this.route();
        this.fallback();
    }

    config() {
        const app = this.app;
        // view engine setup
        app.set('views', path.join(__dirname, 'views'));
        app.set('view engine', 'hbs');
        // uncomment after placing your favicon in /public
        app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        app.use(logger('dev'));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(cookieParser());
        app.use(require('node-sass-middleware')({
            includePaths: ['bower_components/bootstrap/scss'],
            src: path.join(__dirname, 'public'),
            dest: path.join(__dirname, 'public'),
            sourceMap: true
        }));

        //noinspection JSUnresolvedFunction
        app.use(express.static(path.join(__dirname, 'public')));
    };

    route() {
        const app = this.app;
        app.use('/', index);
        app.use('/users', users);
        app.use('/result', result);
    }

    fallback() {
        const app = this.app;
        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            const err = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handler
        app.use((err, req, res) => {
            // set locals, only providing error in development
            res.locals.message = err.message;
            res.locals.error = req.app.get('env') === 'development' ? err : {};

            // render the error page
            res.status(err.status || 500);
            res.render('error');
        });
    }
}

const app = new App().app;

const server = app.listen(3000, () => {
    console.log('Express listening on port 3000');
});
