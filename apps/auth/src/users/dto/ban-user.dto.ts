import { AbstractDto } from '@app/common/dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class BanUserDto extends AbstractDto {
  @ApiProperty({ example: 'true', description: 'Block user' })
  @IsNotEmpty()
  @IsBoolean()
  readonly isBanned: boolean;

  @ApiProperty({ example: 'Has been blocked for abuse', description: 'Block status reason' })
  @IsString()
  @IsOptional()
  @Length(5)
  readonly banReason?: string;
}
