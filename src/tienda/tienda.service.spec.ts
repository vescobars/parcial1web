import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { TiendaEntity } from '../cafe/cafe.entity';
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
        telefono: faker.phone.number('#-###-###-###'),
        cafes: null
      })
        tiendaList.push(tienda);
    }
  }

  it('create should return a new tienda', async () => {
    const cafe: TiendaEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      direccion: faker.random.word(),
      telefono: faker.phone.number('###-###-###'),
      cafes : null,
    }
 
    const newTienda: TiendaEntity = await service.create(cafe);
    expect(newTienda).not.toBeNull();
 
    const storedTienda: TiendaEntity = await repository.findOne({where: {id: newTienda.id}});
    expect(storedTienda).not.toBeNull();
    expect(storedTienda.nombre).toEqual(newTienda.nombre);
    expect(storedTienda.descripcion).toEqual(newTienda.descripcion);
    expect(storedTienda.precio).toEqual(newTienda.precio);
  });

  it('create should return a logic error when creating a tienda', async () => {
    const cafe: TiendaEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      direccion: faker.random.word(),
      telefono: faker.phone.number('###-###-###-###'),
      tiendas:null,
    }
 
    await expect(() => service.create(cafe)).rejects.toHaveProperty("message", "The cafe with the given id fails the price condition");
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new cafe', async () => {
    const cafe: TiendaEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      descripcion: faker.random.words(),
      precio: faker.datatype.number({ min: 1, max: 10000}),
      tiendas:null,
    }
 
    const newTienda: TiendaEntity = await service.create(cafe);
    expect(newTienda).not.toBeNull();
 
    const storedCafe: TiendaEntity = await repository.findOne({where: {id: newTienda.id}});
    expect(storedCafe).not.toBeNull();
    expect(storedCafe.nombre).toEqual(newTienda.nombre);
    expect(storedCafe.descripcion).toEqual(newTienda.descripcion);
    expect(storedCafe.precio).toEqual(newTienda.precio);
  });

  it('create should return a logic error when creating a cafe', async () => {
    const cafe: TiendaEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      descripcion: faker.random.words(),
      precio: faker.datatype.number({ min: -10000, max: -1}),
      tiendas:null,
    }
 
    await expect(() => service.create(cafe)).rejects.toHaveProperty("message", "The cafe with the given id fails the price condition");
  });
});
