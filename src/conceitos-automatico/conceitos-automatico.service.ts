import { Injectable } from '@nestjs/common';

@Injectable()
export class ConceitosAutomaticoService {
  solucionaHome(): string {
    return 'home do conceitos automaticos solucionada';
  }
}
