import { UserEntity } from '../entity/user.entity';
import { PickType } from '@nestjs/swagger';

export class CreateUserDto extends PickType(UserEntity, [
	'email',
	'role',
	'fullName',
	'password',
] as const) {}
