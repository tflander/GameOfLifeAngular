import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

function verifyGrid(expectedGrid: string[][]) {

}

describe('GameService Tests', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('does something interesting', () => {
    // TODO: test drive the game
  });


});
