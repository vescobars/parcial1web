import { CafeEntity } from '../cafe/cafe.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TiendaEntity {
    @PrimaryGeneratedColumn()
    id: number
    
    @Column()
    nombre: string;
    
    @Column()
    direccion: string;

    @Column()
    telefono: string;

    @ManyToMany(() => CafeEntity, cafe => cafe.tiendas)
    @JoinTable()
    cafes: CafeEntity[];
}
