import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';

@Module({
  controllers: [RecadosController],
  providers: [RecadosService,
    {
      provide: RecadosUtils,
      useClass: RecadosUtils
    }
  ],
  imports: [
    TypeOrmModule.forFeature([Recado]),
    PessoasModule,
  ]
})
export class RecadosModule {}
