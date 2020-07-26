import { IsString } from 'class-validator';
export class SelectPlanPermissionDto {
  @IsString()
  readonly permission_id:string ;
}
