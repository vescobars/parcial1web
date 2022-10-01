import { Test, TestingModule } from '@nestjs/testing';
import { CafeEntity } from '../cafe/cafe.entity';
import { TiendaEntity } from '../tienda/tienda.entity';
import { Repository } from 'typeorm';
import { CafeTiendaService } from './cafe-tienda.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CafeTiendaService', () => {
  let service: CafeTiendaService;
  let repositoryCafe: Repository<CafeEntity>;
  let repositoryTienda: Repository<TiendaEntity>;
  let cafeList: CafeEntity[];
  let tiendaList: TiendaEntity[];


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeTiendaService],
    }).compile();

    service = module.get<CafeTiendaService>(CafeTiendaService);
    repositoryTienda = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    repositoryCafe = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repositoryTienda.clear();
    repositoryCafe.clear();

    tiendaList = [];
    tiendaList = [];
    for(let i = 0; i < 5; i++){
        const tienda: TiendaEntity = await repositoryTienda.save({
        nombre: faker.random.word(),
        direccion: faker.random.word(),
        telefono: faker.phone.number('###-###-####'),
        cafes: null
      })
        tiendaList.push(tienda);
    }

    cafeList = [];
    for(let i = 0; i < 5; i++){
        const cafe: CafeEntity = await repositoryCafe.save({
        nombre: faker.random.word(),
        descripcion: faker.random.words(),
        precio: faker.datatype.number({ min: 1, max: 10000}),
        tiendas:null,
      })
      cafeList.push(cafe);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
