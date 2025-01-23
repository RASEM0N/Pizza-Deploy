import { IsArray, IsNumber, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
	@ApiProperty()
	@IsNumber()
	@IsPositive()
	productItemId: number;

	@ApiProperty()
	@IsArray()
	ingredients?: number[];
}
