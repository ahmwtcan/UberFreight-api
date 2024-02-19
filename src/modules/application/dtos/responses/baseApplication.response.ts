import { ApiProperty } from '@nestjs/swagger';

export default class BaseApplicationResponse{
  @ApiProperty({ type: () => [ApplicationList] })
  items: ApplicationList[];
  constructor(items: ApplicationList[]) {
    this.items = items;
  }
}

export class ApplicationList{

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}