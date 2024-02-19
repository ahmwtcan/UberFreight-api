import {ApiProperty} from "@nestjs/swagger";

export class SuccessWithNoDataDto  {
    @ApiProperty()
    status: boolean;
    constructor( status: boolean ) {
        this.status = status
    }
}