import { IsEmail, IsEnum, Length, IsString } from 'class-validator';
import { UserRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
	@ApiProperty()
	@IsEmail()
	@Length(4, 20)
	email: string;

	@ApiProperty()
	@IsString()
	@Length(10, 40)
	password: string;

	@ApiProperty()
	@IsString()
	@Length(4, 50)
	fullName: string;

	@ApiProperty()
	@IsEnum(UserRole)
	role: UserRole;
}
