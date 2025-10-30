import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Recado } from './entities/recado.entity';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PessoasService } from 'src/pessoas/pessoas.service';

@Injectable()
export class RecadosService {
  constructor (
    @InjectRepository(Recado)
    private readonly recadoRepository: Repository<Recado>,
    private readonly pessoasService: PessoasService
  ) {}

  async findAll() {
    const recados = await this.recadoRepository.find({
      relations: ['de', 'para'],
      order: { id: "DESC"},
      select: {
        de: {
          id: true,
          name: true
        },
        para: {
          id: true,
          name: true
        }
      }
    });
    return recados; 
  }

  async findOne(id: number) {
    const recado = await this.recadoRepository.findOne({
      where: {
        id: id,
      }
    })
    if (recado) return recado
    
    // throw new HttpException("Recado não encontrado", HttpStatus.NOT_FOUND)
    throw new NotFoundException("Recado nao encontrado");
  }

  async create(body: CreateRecadoDto) {
    //Encontrar a pessoa que esta criando o recado
    //Encontrar a pessoa da qual o recado esta sendo enviado
    const { deId, paraId } = body;

    const de = await this.pessoasService.findOne(deId);
    const para = await  this.pessoasService.findOne(paraId);

    const newRecado = {
      texto: body.texto,
      de: de,
      para: para,
      lido: false,
      data: new Date()
    };
    const recado = this.recadoRepository.create(newRecado);
    await this.recadoRepository.save(recado);

    return {
      ...recado,
      de: {
        id: recado.de.id,
        name: recado.de.name,
      },
      para: {
        id: recado.para?.id,
        name: recado?.para?.name
      }
    };
  }

  async update(id: number, updateRecadoDto: UpdateRecadoDto) {

    const recado = await this.findOne(id);

    recado.texto = updateRecadoDto?.texto ?? recado.texto;
    recado.lido = updateRecadoDto?.lido ?? recado?.lido
    return await this.recadoRepository.save(recado);

  }

  async remove(id: number) {
    const recado = await this.recadoRepository.findOne({
      where:{
        id: id
      }
    });
    
    if (!recado) {
      throw new NotFoundException("Recado não encontrado");
    }
    return this.recadoRepository.remove(recado);
  }
}
