import {  IsString, IsNotEmpty } from 'class-validator';

export class CreateBusinessDto {

  @IsNotEmpty()
  @IsString()
  readonly user_id:  string ;
  @IsString()
  readonly permission_id:  string ;
  readonly list_email: [];

}
