import { Injectable } from '@nestjs/common';
import { Recado } from './entities/recado.entity';

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
    return this.recados?.find((recado) => recado.id == Number(id));
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newRecado = {
      id,
      ...body,
    };
    this.recados.push(newRecado);
    return newRecado;
  }

  update(id: string, body: any) {
    const recadosExistenteIndex = this.recados.findIndex(
      (item) => item.id === +id,
    );

    if (recadosExistenteIndex >= 0) {
      const recadoExistente = this.recados[recadosExistenteIndex];

      this.recados[recadosExistenteIndex] = {
        ...recadoExistente,
        ...body,
      };
    }

    return this.recados[recadosExistenteIndex];
  }

  remove(id: string) {
    const recadosExistenteIndex = this.recados.findIndex(
      (item) => item.id === +id,
    );

    if (recadosExistenteIndex) {
      this.recados.splice(recadosExistenteIndex, 1);
    }
  }
}
