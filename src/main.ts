import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';
import { MyExceptionFilter } from './common/filters/my-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que não estão no dto
      forbidNonWhitelisted: true, //levanta erro quando a chave não existir
      transform: false, //Tenta transformar os tipos de dados de parametros e DTO's
    }),
    new ParseIntIdPipe(),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
