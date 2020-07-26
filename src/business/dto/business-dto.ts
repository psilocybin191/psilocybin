import {  IsString, IsNotEmpty,IsArray,IsObject } from 'class-validator';

export class BusinessDto {
  @IsString()
  readonly image: string;
  @IsArray()
  readonly list_email: [];
  @IsObject()
  readonly permission_id: { objId: string };

}
