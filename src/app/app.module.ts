import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5430,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true, //Carrega entidades sem precisar especifica-las
      synchronize: true // Não deve ser utsado em produção
  }), 
  RecadosModule
],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
