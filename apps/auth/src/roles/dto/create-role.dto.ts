import { AbstractDto } from '@app/common/dto';
import { IsNotEmpty, IsOptional, IsString, IsUppercase } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto extends AbstractDto {
  @ApiProperty({ example: 'ADMIN', description: 'Role' })
  @IsString()
  @IsNotEmpty()
  @IsUppercase()
  readonly value: string;

  @ApiProperty({
    example: 'System administrator, has access to all features',
    description: 'Role description',
  })
  @IsString()
  @IsOptional()
  readonly description?: string;
}
