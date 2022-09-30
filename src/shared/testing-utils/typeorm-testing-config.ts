import { TypeOrmModule } from '@nestjs/typeorm';
import { CafeEntity } from 'src/cafe/cafe.entity';
import { TiendaEntity } from 'src/tienda/tienda.entity';

export const TypeOrmTestingConfig = () => [
 TypeOrmModule.forRoot({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    entities: [
      CafeEntity,
      TiendaEntity],
    synchronize: true,
    keepConnectionAlive: true
 }),
 TypeOrmModule.forFeature([CafeEntity,TiendaEntity]),
];
