import { Module } from '@nestjs/common';
import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';
import { BusinessSchema } from './schemas/business-schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Business', schema: BusinessSchema }
  ])],
  controllers: [BusinessController],
  providers: [BusinessService]
})
export class BusinessModule {}
