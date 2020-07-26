import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {default as config} from './config';
import { BusinessModule } from './business/business.module';
import { NewsModule } from './news/news.module';
import { ContactModule } from './contact/contact.module';


const userString = config.db.user && config.db.pass ? (config.db.user + ':' + config.db.pass + '@') : '';
const authSource = config.db.authSource ? ('?authSource='+config.db.authSource + '&w=1') : '' ;

// RealDatabase

const uri = "mongodb+srv://User1:fUJT8tl9XhOmUMbS@cluster0.anfp2.mongodb.net/<psilocybin>?retryWrites=true&w=majority";



//TestDatabase
// mongodb+srv://third1020:<password>@cluster0-uq3w8.mongodb.net/test?retryWrites=true&w=majority
@Module({
  controllers: [AppController],
  providers: [AppService],
  // imports: [MongooseModule.forRoot('mongodb://' + userString + config.db.host + ':' + (config.db.port || '27017') +'/' + config.db.database + authSource),
  imports: [MongooseModule.forRoot(uri), NewsModule, ContactModule],
  // import : [MongooseModule.forRoot('mongodb://localhost/nest')]
})
export class AppModule {}
