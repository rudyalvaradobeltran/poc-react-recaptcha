import { Controller, Post, Body, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DataDTO } from './dto/Data.dto';

@Controller('data')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('save')
  save(@Body() data: DataDTO): string {
    return this.appService.save(data.name);
  }

  @Get('sitekey')
  sitekey(): string {
    return process.env.sitekey;
  }
}
