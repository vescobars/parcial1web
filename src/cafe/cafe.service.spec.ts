import { Test, TestingModule } from '@nestjs/testing';
import { CannotGetEntityManagerNotConnectedError, Repository } from 'typeorm';
import { CafeService } from './cafe.service';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { CafeEntity } from './cafe.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { faker } from '@faker-js/faker';

describe('CafeService', () => {
  let service: CafeService;
  let repository: Repository<CafeEntity>;
  let cafeList: CafeEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [CafeService],
    }).compile();

    service = module.get<CafeService>(CafeService);
    repository = module.get<Repository<CafeEntity>>(getRepositoryToken(CafeEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    cafeList = [];
    for(let i = 0; i < 5; i++){
        const cafe: CafeEntity = await repository.save({
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


  it('create should return a new cafe', async () => {
    const cafe: CafeEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      descripcion: faker.random.words(),
      precio: faker.datatype.number({ min: 1, max: 10000}),
      tiendas:null,
    }
 
    const newCafe: CafeEntity = await service.create(cafe);
    expect(newCafe).not.toBeNull();
 
    const storedCafe: CafeEntity = await repository.findOne({where: {id: newCafe.id}});
    expect(storedCafe).not.toBeNull();
    expect(storedCafe.nombre).toEqual(newCafe.nombre);
    expect(storedCafe.descripcion).toEqual(newCafe.descripcion);
    expect(storedCafe.precio).toEqual(newCafe.precio);
  });

  it('create should return a logic error when creating a cafe', async () => {
    const cafe: CafeEntity = {
      id: faker.datatype.number({ min: 1}),
      nombre: faker.random.word(),
      descripcion: faker.random.words(),
      precio: faker.datatype.number({ min: -10000, max: -1}),
      tiendas:null,
    }
 
    await expect(() => service.create(cafe)).rejects.toHaveProperty("message", "The cafe with the given id fails the price condition");
  });
});
