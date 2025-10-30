import { IsEmail } from "class-validator";
import { Recado } from "src/recados/entities/recado.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Pessoa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column({ length: 255})
    passowrdHash: string;

    @Column({  length: 100 })
    name: string;

    @CreateDateColumn()
    createdAt?: Date;

    @UpdateDateColumn()
    updatedAt?: Date;

    // Uma pessoa pode ter enviado muitos recados, relacionados pelo campo "de"
    @OneToMany(() => Recado, recado => recado?.de)
    recadosEnviados: Recado[];

    @OneToMany(() => Recado, recado => recado?.para)
    recadosRecebidos : Recado[];

}
