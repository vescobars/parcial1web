/* eslint-disable prettier/prettier */
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class CafeEntity{
        @PrimaryGeneratedColumn()
        id: number
		
		@Column()
		nombre: string;
		
        @Column()
		descripcion: string;

        @Column()
		precio: number;
	

		@ManyToMany(() => TiendaEntity, tienda => tienda.cafes)
        @JoinTable()
        tiendas: TiendaEntity[];
}