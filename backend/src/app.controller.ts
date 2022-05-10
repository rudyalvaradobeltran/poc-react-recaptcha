import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDTO } from './dto/Data.dto';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('save')
  async save(@Body() data: DataDTO): Promise<string> {
    console.log('data: ', data);
    return this.appService.save(data.name);
  }
}
