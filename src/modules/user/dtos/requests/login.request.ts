import { IsNotEmpty, IsString } from 'class-validator';
import {ApiProperty} from "@nestjs/swagger";

export class LoginRequest {

  @ApiProperty({example: 'ahmet@mail.com'})
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty( {example: '1234'})
  @IsString()
  @IsNotEmpty()
  password: string;
}
