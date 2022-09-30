import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessLogicException, BusinessError } from 'src/shared/errors/business-errors';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';

@Injectable()
export class TiendaService {
    constructor(
        @InjectRepository(TiendaEntity)
        private readonly tiendaRepository: Repository<TiendaEntity>
    ){}

    async create(tienda: TiendaEntity): Promise<TiendaEntity> {
        if (tienda.telefono.length != 10){
            let caracteres = tienda.telefono;
            let arrcaracteres = caracteres.split("-");
            let count = 0 ;
            for (const x of arrcaracteres) { count = count + x.length; }
            if (count != 10){
                throw new BusinessLogicException("The tienda with the given id was not found", BusinessError.PRECONDITION_FAILED);
            }
        }
        return await this.tiendaRepository.save(tienda);
    }
}
