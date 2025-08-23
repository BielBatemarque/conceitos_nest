import { Injectable } from '@nestjs/common';

@Injectable()
export class RecadosService {
  findAll() {
    return 'Retorna uma lista de recados';
  }

  findOne(id: string) {
    return `Retorna o recado de id: ${id}`;
  }
}
