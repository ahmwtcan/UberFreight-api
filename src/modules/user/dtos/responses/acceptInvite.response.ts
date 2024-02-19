import {ApiProperty} from "@nestjs/swagger";

export class AcceptInviteResponse{
  @ApiProperty()
  token: string;
  constructor(token:string) {
    this.token = token;
  }
}