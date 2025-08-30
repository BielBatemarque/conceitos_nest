import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get('hello') // Metodo da request
  getHello(): string {
    return 'qualquer coisa';
  }

  // @Get()
  getExemplo(): string {
    return this.appService.soluciona();
  }
}
