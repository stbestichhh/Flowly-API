import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsString, IsUppercase } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto extends AbstractDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  readonly value: string;
}
