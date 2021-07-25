import { TestBed } from '@angular/core/testing';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('creates the game', () => {
    expect(service.minRow).toEqual(Number.MAX_SAFE_INTEGER)
    expect(service.maxRow).toEqual(Number.MIN_SAFE_INTEGER);
    expect(service.minCol).toEqual(Number.MAX_SAFE_INTEGER)
    expect(service.maxCol).toEqual(Number.MIN_SAFE_INTEGER);
    expect(service.liveRows)
  });

  it('allows you to set a live cell', () => {
    service.setLiveCell(2,3);
    expect(service.minRow).toEqual(3)
    expect(service.maxRow).toEqual(3);
    expect(service.minCol).toEqual(2)
    expect(service.maxCol).toEqual(2);
    expect(service.liveRows.get(3)).toEqual(new Set().add(2))
  });

  it('allows you to add a live cell to a row', () => {
    service.setLiveCell(2,3);
    service.setLiveCell(4,3);
    expect(service.minRow).toEqual(3)
    expect(service.maxRow).toEqual(3);
    expect(service.liveRows.get(3)).toEqual(new Set().add(2).add(4))
  });

  it('allows you to add a new row to the game', () => {
    service.setLiveCell(2,3);
    service.setLiveCell(4,5);
    expect(service.minRow).toEqual(3)
    expect(service.maxRow).toEqual(5);
    expect(service.liveRows.get(3)).toEqual(new Set().add(2))
    expect(service.liveRows.get(5)).toEqual(new Set().add(4))
  });

  it('allows you to set a live cell idempotent', () => {
    service.setLiveCell(2,3);
    service.setLiveCell(4,5);
    service.setLiveCell(4,5);
    expect(service.minRow).toEqual(3)
    expect(service.maxRow).toEqual(5);
    expect(service.liveRows.get(3)).toEqual(new Set().add(2))
    expect(service.liveRows.get(5)).toEqual(new Set().add(4))
  });

  it('counts neighbors', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(0,1);
    service.setLiveCell(1,0);
    service.setLiveCell(1,1);

    expect(service.isLive(1,1)).toBeTrue();
    expect(service.isLive(1,2)).toBeFalse();
    expect(service.isLive(2,1)).toBeFalse();
    expect(service.neighborsFor(0,0)).toEqual(3)
    expect(service.neighborsFor(2,2)).toEqual(1)
    expect(service.neighborsFor(3,3)).toEqual(0)
  });

  it('kills isolated cells', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,1);

    service.tick();

    expect(service.isLive(0,0)).toBeFalse();
    expect(service.isLive(1,1)).toBeFalse();
  });

  it('allows live cells with two (or three neighbors) to survive', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(2,0);

    displayGame();

    service.tick();

    expect(service.isLive(1,0)).toBeTrue();
  });

  function displayGame() {
    let currRow = service.minRow;
    while (currRow <= service.maxRow) {
      let row = "";
      let rows = service.liveRows.get(currRow);
      for (let col = service.minCol; col <= service.maxCol; ++col) {
        if(rows && rows.has(col))
          row += 'X'
        else
          row += '.'
      }
      console.log(row)
      ++currRow;
    }
  }

});
