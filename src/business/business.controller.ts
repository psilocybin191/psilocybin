import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  HttpCode,
  HttpStatus,
  HttpException,
  Param,
  NotFoundException,
  UseGuards,
  UseInterceptors,
  UsePipes
} from '@nestjs/common';
import { ValidationPipe } from '../common/pipe/validation.pipe';
import { CreateBusinessDto } from './dto/create-business-dto';
import { BusinessDto } from './dto/business-dto';
import { Business } from './interfaces/business.interface';
import { BusinessService } from './business.service';
import { ResponseSuccess, ResponseError } from '../common/dto/response.dto';
import { IResponse } from '../common/interfaces/response.interface';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import { AuthGuard } from '@nestjs/passport';
import { SelectPlanPermissionDto } from './dto/select-plan-permission';

@Controller('business')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class BusinessController {
  constructor(private readonly businessService: BusinessService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createBusinessDto: CreateBusinessDto): Promise<IResponse> {
    try {
      var newBusiness = await this.businessService.createBusiness(createBusinessDto);
      return new ResponseSuccess("BUSINESS.CREATED_SUCCESS",newBusiness);
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS.CREATED_ERROR",error);
    }
  }

  @Get()
  async findAll(): Promise<IResponse> {
    try {
      var ListBusiness = await this.businessService.findAll();
      return new ResponseSuccess("BUSINESS.FOUND",ListBusiness);
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS.NOT_FOUND",error);
    }
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<IResponse> {
    try {
      const Business = await this.businessService.findById(id);
      return new ResponseSuccess("BUSINESS.FOUND",Business);
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS.NOT_FOUND",error);
    }
  }

  @Get('user_id/:id')
  async findByUserId(@Param('id') id: string): Promise<IResponse> {
    try {
      const Business = await this.businessService.findByUserId(id);
      return new ResponseSuccess("BUSINESS_USERID.FOUND",Business);
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS_USERID.NOT_FOUND",error);
    }
  }
  //
  @Put(':id')
  async updateBusiness(@Param('id') id: string, @Body() updateBusinessDto: BusinessDto): Promise<IResponse> {
    try {
      const Business = await this.businessService.updateBusiness(id, updateBusinessDto);
      return new ResponseSuccess("BUSINESS.UPDATE_SUCCESS",Business);
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS.UPDATE_ERROR",error);
    }
  }

  @Put('SelectPlan/:id')
  @UsePipes(ValidationPipe)
  async SelectPlan(@Param('id') id: string, @Body() SelectPlanPermissionDto: SelectPlanPermissionDto): Promise<IResponse> {
    try {
      const Business = await this.businessService.SelectPlan(id, SelectPlanPermissionDto);
      return new ResponseSuccess("BUSINESS.UPDATE_PLAN_SUCCESS",Business);
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS.UPDATE_PLAN_ERROR",error);
    }
  }

  @Delete(':id')
  async removeBusiness(@Param('id') id: string): Promise<IResponse> {
    try {
      const deleteBusiness = await this.businessService.deleteBusiness(id);
      return new ResponseSuccess("BUSINESS.DELETE_SUCCESS");
    } catch (error) {
      // console.log(error);
      return new ResponseError("BUSINESS.DELETE_ERROR",error);
    }
  }

}
