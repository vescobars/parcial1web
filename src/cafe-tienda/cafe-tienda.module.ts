import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from 'src/cafe/cafe.entity';
import { TiendaEntity } from 'src/tienda/tienda.entity';
import { CafeTiendaService } from './cafe-tienda.service';

@Module({
  imports: [TypeOrmModule.forFeature([CafeEntity]),TypeOrmModule.forFeature([TiendaEntity])],
  providers: [CafeTiendaService]
})
export class CafeTiendaModule {}
