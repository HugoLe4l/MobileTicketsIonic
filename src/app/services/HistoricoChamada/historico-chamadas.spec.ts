import { TestBed } from '@angular/core/testing';

import { HistoricoChamadas } from './historico-chamadas';

describe('HistoricoChamadas', () => {
  let service: HistoricoChamadas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoricoChamadas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
