import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  var bodyParser = require('body-parser');
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

  //SECURITY
  app.enableCors();
  app.use(helmet());
  app.enableCors();

  //

  app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50000, // limit each IP to 100 requests per windowMs
  message:
    "Too many requests from this IP, please try again later"
}));

// const createAccountLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour window
//   max: 3, // start blocking after 3 requests
//   message:
//     "Too many accounts created from this IP, please try again after an hour"
// });
// app.use("/auth/email/register", createAccountLimiter);

  await app.listen(process.env.PORT || 3000);


}
bootstrap();
