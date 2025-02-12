import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignClaimDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'permission' })
  @IsString()
  claimType: string;

  @ApiProperty({ example: 'create:product' })
  @IsString()
  claimValue: string;
}
