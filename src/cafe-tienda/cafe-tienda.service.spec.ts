import { Test, TestingModule } from '@nestjs/testing';
import { CafeTiendaService } from './cafe-tienda.service';

describe('CafeTiendaService', () => {
  let service: CafeTiendaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CafeTiendaService],
    }).compile();

    service = module.get<CafeTiendaService>(CafeTiendaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
