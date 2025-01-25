import { UserEntity } from '../entity/user.entity';
import { PickType } from '@nestjs/swagger';

// @TODO по идее Partial Type должно быть
export class UpdateUserDto extends PickType(UserEntity, [
	'email',
	'fullName',
	'password',
] as const) {}
