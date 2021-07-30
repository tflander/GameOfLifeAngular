import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('kills isolated cells', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,1);

    service.tick();

    expect(service.grid.isLive(0,0)).toBeFalse();
    expect(service.grid.isLive(1,1)).toBeFalse();
  });

  it('allows live cells with two neighbors to survive', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(2,0);

    displayGame();

    service.tick();

    expect(service.grid.isLive(1,0)).toBeTrue();
  });

  it('allows live cells with three neighbors to survive', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(1,1);
    service.setLiveCell(2,0);

    displayGame();

    service.tick();

    expect(service.grid.isLive(1,0)).toBeTrue();
  });

  function displayGame() {
    let stringGrid = service.grid.asRows();
    stringGrid.forEach(function (row) {
      console.log(row);
    });
  }

});
