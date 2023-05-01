import { TestBed } from '@angular/core/testing';

import { OperationTypeService } from './operationtype.service';

describe('OperationtypeService', () => {
  let service: OperationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
