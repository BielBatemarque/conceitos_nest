import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities/recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils, RecadosUtilsMock } from './recados.utils';
import { serverName } from 'src/common/constants/server-name.constant';

@Module({
  controllers: [RecadosController],
  providers: [
    RecadosService,
    {
      provide: RecadosUtils,
      useValue: new RecadosUtilsMock() //Valor a ser usado 
    },
    {
      provide: serverName,
      useValue: "MY Name is Nest JS"
    }
  ],
  imports: [
    TypeOrmModule.forFeature([Recado]),
    forwardRef(() => PessoasModule),
  ],
  exports: [RecadosUtils, serverName],
})
export class RecadosModule {}
