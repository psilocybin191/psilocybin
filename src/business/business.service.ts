import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BusinessDto } from './dto/business-dto';
import { CreateBusinessDto } from './dto/create-business-dto';
import { SelectPlanPermissionDto } from './dto/select-plan-permission';

import { Business } from './interfaces/business.interface';
import { Model } from 'mongoose';
import {
  NotFoundException,
  HttpException
} from '@nestjs/common';

@Injectable()
export class BusinessService {
  constructor(@InjectModel('Business') private readonly businessModel: Model<Business>) { }

  async createBusiness(CreateBusinessDto: CreateBusinessDto): Promise<Business> {
    const createdBusiness = new this.businessModel(CreateBusinessDto);
    return await createdBusiness.save();
  }

  async findAll(): Promise<Business[]> {
    const listBusinessDB = await this.businessModel.find().exec();
    if (!listBusinessDB) {
      throw new NotFoundException('Business Not Found');
    }
    return listBusinessDB;
  }

  async findById(id: string): Promise<Business> {
    const BusinessDB = await this.businessModel.findById(id).exec();
    if (!BusinessDB) {
      throw new NotFoundException('Business Not Found');
    }
    return BusinessDB;
  }

  async findByUserId(id: string): Promise<Business> {
    const BusinessDB = await this.businessModel.findOne({user_id : id}).exec();
    if (!BusinessDB) {
      throw new NotFoundException('BusinessDB UserID Not Found');
    }
    return BusinessDB;
  }

  async updateBusiness(id: string, updateBusinessDto: BusinessDto): Promise<Business> {
    const BusinessDB = await this.businessModel.findById(id).exec();
    if (!BusinessDB) {
      throw new NotFoundException('BusinessDB Not Found');
    }
    if (updateBusinessDto.image) {
      BusinessDB.image = updateBusinessDto.image
    }
    if (updateBusinessDto.list_email) {
      BusinessDB.list_email = updateBusinessDto.list_email
    }
    return await BusinessDB.save();
  }

  async SelectPlan(id: string, SelectPlanPermissionDto: SelectPlanPermissionDto): Promise<Business> {
    const BusinessDB = await this.businessModel.findById(id).exec();
    if (!BusinessDB) {
      throw new NotFoundException('BusinessDB Not Found');
    }
    if (SelectPlanPermissionDto.permission_id) {
      BusinessDB.permission_id = SelectPlanPermissionDto.permission_id
    }
    return await BusinessDB.save();
  }

  async deleteBusiness(id: string): Promise<any> {
    const result = await this.businessModel.deleteOne({ _id: id }).exec();
    if (result.n === 0) {
      throw new HttpException('Not Found', 404);
    }
    return result;
  }

}
