import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { TiendaEntity } from './tienda.entity';
import { TiendaService } from './tienda.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('TiendaService', () => {
  let service: TiendaService;
  let repository: Repository<TiendaEntity>;
  let tiendaList: TiendaEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [TiendaService],
    }).compile();

    service = module.get<TiendaService>(TiendaService);
    repository = module.get<Repository<TiendaEntity>>(getRepositoryToken(TiendaEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    tiendaList = [];
    for(let i = 0; i < 5; i++){
        const tienda: TiendaEntity = await repository.save({
        nombre: faker.random.word(),
        direccion: faker.random.word(),
        telefono: faker.phone.number('###-###-####'),
        cafes: null
      })
        tiendaList.push(tienda);
    }
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new cafe', async () => {
    const cafe: TiendaEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      direccion: faker.random.word(),
      telefono: faker.phone.number('###-###-####'),
      cafes:null,
    }
 
    const newTienda: TiendaEntity = await service.create(cafe);
    expect(newTienda).not.toBeNull();
 
    const storedCafe: TiendaEntity = await repository.findOne({where: {id: newTienda.id}});
    expect(storedCafe).not.toBeNull();
    expect(storedCafe.nombre).toEqual(newTienda.nombre);
    expect(storedCafe.direccion).toEqual(newTienda.direccion);
    expect(storedCafe.telefono).toEqual(newTienda.telefono);
  });

  it('create should return a logic error when creating a cafe', async () => {
    const cafe: TiendaEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      direccion: faker.random.word(),
      telefono: faker.phone.number('###-###-##########'),
      cafes:null,
    }
 
    await expect(() => service.create(cafe)).rejects.toHaveProperty("message", "The tienda with the given id fails the telephone condition");
  });
});
