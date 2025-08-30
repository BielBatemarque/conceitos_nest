import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosService {
  findAll() {
    return 'Retorna uma lista de recados';
  }

  findOne(id: string) {
    return `Retorna o recado de id: ${id}`;
  }

  create(body: any) {
    return {
      ...body,
    };
  }

  update(id: string, body: any) {
    return {
      id,
      ...body,
    };
  }

  remove(id: string) {
    return `Essa rota apaga o recado para o id: ${id}`;
  }
}
