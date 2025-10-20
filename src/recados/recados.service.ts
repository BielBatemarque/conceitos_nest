import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';

@Injectable()
export class RecadosService {
  private lastId = 1;
  private recados: Recado[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Joana',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.recados;
  }

  findOne(id: string) {
    const recado = this.recados?.find((recado) => recado.id == Number(id));
    if (recado) return recado
    
    // throw new HttpException("Recado não encontrado", HttpStatus.NOT_FOUND)
    throw new NotFoundException("Recado nao encontrado");
  }

  create(body: CreateRecadoDto) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = {
      id,
      ...body,
      lido: false,
      data: new Date()
    };
    this.recados.push(newRecado);
    return newRecado;
  }

  update(id: string, updateRecadoDto: UpdateRecadoDto) {
    const recadosExistenteIndex = this.recados.findIndex(
      (item) => item.id === +id,
    );

    if (recadosExistenteIndex < 0) {
      throw new NotFoundException("Recado não encontrado");
    }

    if (recadosExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadosExistenteIndex];

      this.recados[recadosExistenteIndex] = {
        ...recadoExistente,
        ...updateRecadoDto,
      };
    }

    return this.recados[recadosExistenteIndex];
  }

  remove(id: number) {
    const recadosExistenteIndex = this.recados.findIndex(
      (item) => item.id === id,
    );

    if (recadosExistenteIndex < 0) {
      throw new NotFoundException("Recado não encontrado");
    }

    const recado = this.recados[recadosExistenteIndex];
    this.recados.splice(recadosExistenteIndex, 1);
    return recado;
  }
}
