import { PickType } from '@nestjs/swagger';
import { UserEntity } from '@/modules/user/entity/user.entity';

export class LoginDto extends PickType(UserEntity, ['email', 'password']) {}
