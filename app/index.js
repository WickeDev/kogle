//noinspection JSUnresolvedVariable
import express from 'express';
import * as path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

//import result from './routes/result';
import index from './routes/index';
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
        // view engine setup
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'hbs');
        // uncomment after placing your favicon in /public
        this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
        this.app.use(logger('dev'));
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(require('node-sass-middleware')({
            src: path.join(__dirname, 'public'),
            dest: path.join(__dirname, 'public'),
            sourceMap: true
        }));

        //noinspection JSUnresolvedFunction
        this.app.use(express.static(path.join(__dirname, 'public')));
    };

    route() {
        this.app.use('/', index);
        this.app.use('/users', users);
        //app.use('/result', result);
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

export default App;
