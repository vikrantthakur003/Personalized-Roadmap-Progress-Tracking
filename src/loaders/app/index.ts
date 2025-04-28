import cors from 'cors';
import express, { Express } from 'express';
import { createServer, Server } from 'http';
import morgan from 'morgan';
import * as process from 'process';
import { makeResponse } from '../../lib/response';

const PORT = Number(process.env.PORT) || 3000;
const HOST: string = String(process.env.HOST || '0.0.0.0');

const appLoader = async (app: Express, router: any) => new Promise<any>(resolve => {
  const server: Server = createServer(app);
  app.use(cors({
    origin: true,
    credentials: true
  }));
  app.use(express.json({
    limit: '10mb'
  }));
  app.use(express.urlencoded({
    extended: true
  }));
  app.use(morgan((tokens, req, res) => {
    return JSON.stringify({
      time: new Date().toISOString(),
      statusCode: res.statusCode,
      responseTime: tokens['response-time'](req, res, 'iso'),
      method: req.method,
      path: req.url,
      corId: tokens.corId(req, res),
      corIdNew: tokens.corIdNew(req, res)
    });
  }));

  app.use('/auth', router);

  app.use(async (req, res) => {
    await makeResponse(res, 404, false, 'the resource you are looking for is not found', undefined);
  });
  server.listen(PORT, HOST, () => {
    console.log('App is running on port: ', PORT);
    resolve(true);
  });
});

export { appLoader };
