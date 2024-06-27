import { AbstractDto } from '@app/common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { RolesEnum } from '@app/common/enums';

export class AddRoleDto extends AbstractDto {
  @ApiProperty({ example: 'useruuid', description: 'User id' })
  @IsNotEmpty()
  @IsString()
  readonly userId: string;

  @ApiProperty({ example: 'ADMIN', description: 'User role' })
  @IsNotEmpty()
  @IsString()
  readonly role: string;
}
