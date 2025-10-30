import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PessoasService {
  constructor (@InjectRepository(Pessoa) private readonly pessoaRepository: Repository<Pessoa>) {}

  async create(createPessoaDto: CreatePessoaDto) {
    try{
      const pessoaData = {
          name: createPessoaDto.name,
          passowrdHash: createPessoaDto.password,
        email: createPessoaDto.email,
      };

      const newPerson = this.pessoaRepository.create(pessoaData);
      await this.pessoaRepository.save(newPerson);
      return newPerson;
    } catch(error) {
      if (error.code === "23505") {
        throw new ConflictException("E-mail já esta cadastrado");
      }
      throw error;
    }
  }

  async findAll() {
    return await this.pessoaRepository.find({order: { id: "DESC" }});
  }

  async  findOne(id: number) {
    return await this.pessoaRepository.findOneBy({ id: id });
  }

  async update(id: number, updatePessoaDto: UpdatePessoaDto) {
    const pessoaData = {
        name: updatePessoaDto?.name,
        passowrdHash: updatePessoaDto?.password,
    };

    const person = await this.pessoaRepository.preload({
      id,
      ...pessoaData
    });

    if (!person) throw new NotFoundException("Pessoa não encontrada");

    return this.pessoaRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.pessoaRepository.findOneBy({ id: id });

    if (!person) throw new NotFoundException("Pessoa não encontrada");
    
    await this.pessoaRepository.remove(person);
    return person;

  }
}
