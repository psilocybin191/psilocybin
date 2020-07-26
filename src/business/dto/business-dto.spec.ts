import { Test, TestingModule } from '@nestjs/testing';
import { BusinessDto } from './business-dto';

describe('BusinessDto', () => {
  let provider: BusinessDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BusinessDto],
    }).compile();

    provider = module.get<BusinessDto>(BusinessDto);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
