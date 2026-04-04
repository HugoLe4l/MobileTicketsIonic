import { TestBed } from '@angular/core/testing';

import { AgentResponse } from './agent-response';

describe('AgentResponse', () => {
  let service: AgentResponse;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentResponse);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
