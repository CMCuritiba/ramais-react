import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
// import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import passport from 'passport';

// import winston from './config/log';
import routes from './routes';
import './database';

require('./config/passport')(passport);

class App {
  constructor() {
    // carrega o express
    this.server = express();
    // carrega os middlewares
    this.middlewares();
    // carrega as rotas
    this.routes();
    // carrega o handler de exception
    this.exceptionHandler();
  }

  middlewares() {
    // configura o express
    this.server.use(express.json());
    // formata o JSON retornado
    // this.server.set('json spaces', 4);
    // configura o log da aplicação
    // this.server.use(morgan('combined', { stream: winston.stream }));
    // configura o helmet
    // this.server.use(helmet());
    // configura a compressão nas requisições
    // this.server.use(compression());
    // configura o parser do JSON
    this.server.use(
      express.urlencoded({
        extended: true,
      })
    );
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(passport.initialize());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
