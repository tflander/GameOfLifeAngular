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

  it('allows re-init to an empty sized grid size', () => {
    service.reInitEmpty(3, 2);

    verifyGrid([
      '...',
      '...'
    ])
  });

  it('expands the border for a blinker', () => {
    service.reInitEmpty(5, 5)

    service.setGrid(
      [
        '...',
        'XXX',
        '...',
      ]);

    service.tick();

    verifyGrid(
      [
        '.X...',
        '.X...',
        '.X...',
        '.....',
        '.....'
      ]);

    service.tick();

    verifyGrid(
      [
        '.....',
        'XXX..',
        '.....',
        '.....',
        '.....'
      ]);

  });

  it('shows a blinker', () => {
    service.reInitEmpty(5, 5)

    service.setGrid(
      [
        '.....',
        '.....',
        '.XXX.',
        '.....',
        '.....',
      ]);

    displayGame();
    service.tick();

    verifyGrid(
      [
        '.....',
        '..X..',
        '..X..',
        '..X..',
        '.....',

      ]);

  });

  function displayGame() {
    let stringGrid = service.grid.asRows();
    stringGrid.forEach(function (row) {
      console.log(`|${row}|`);
    });
  }

  function verifyGrid(expectedGrid: string[]) {
    verifyGridSize(expectedGrid);

    expectedGrid.forEach((row, rowNum) => {

      for (let colNum = 0; colNum < row.length; colNum++) {
        expect(service.grid.isLive(colNum, rowNum))
          .withContext(`Mismatch for column ${colNum}, Row ${rowNum}`)
          .toBe(expectedGrid[rowNum][colNum] === 'X');
      }
    });
  }

  function verifyGridSize(expectedGrid: string[]) {
    expect(service.grid.rowCount())
      .withContext(`grid has ${service.grid.rowCount()} rows, expected ${expectedGrid.length} rows`)
      .toEqual(expectedGrid.length);

    if(service.grid.rowCount() > 0) {
      expect(service.grid.columnCount())
        .withContext(`grid has ${service.grid.columnCount()} columns, expected ${expectedGrid[0].length} columns`)
        .toEqual(expectedGrid[0].length);
    }
  }
})

describe('GameService Rules', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('kills isolated cells', () => {

    service.setGrid(
      [
        'X.',
        '.X'
      ]
    );

    service.tick();

    verifyGridIsEmpty();

    expect(service.grid.isLive(0,0)).toBeFalse();
    expect(service.grid.isLive(1,1)).toBeFalse();
  });

  it('allows live cells with two neighbors to survive', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(2,0);

    service.setGrid(
      [
        'XXX'
      ]
    );

    service.tick();

    expect(service.grid.isLive(1,0)).toBeTrue();
  });

  it('allows live cells with three neighbors to survive', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(1,1);
    service.setLiveCell(2,0);

    service.tick();

    expect(service.grid.isLive(1,0)).toBeTrue();
  });

  it('kills live cells with more than three neighbors', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(1,1);
    service.setLiveCell(2,0);
    service.setLiveCell(2,1);

    service.tick();

    expect(service.grid.isLive(1,0)).toBeFalse();
  });

  it('kills live cells with less than two neighbors', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);

    service.tick();

    expect(service.grid.isLive(1,0)).toBeFalse();
  });

  it('Any dead cell with exactly three live neighbours becomes a live cell', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(0,1);

    service.tick();

    expect(service.grid.isLive(1,1)).toBeTrue();
  });

  it('Any dead cell with less than three live neighbours stays dead', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);

    service.tick();

    expect(service.grid.isLive(1,1)).toBeFalse();
  });

  it('Any dead cell with more than three live neighbours stays dead', () => {
    service.setLiveCell(0,0);
    service.setLiveCell(1,0);
    service.setLiveCell(0,1);
    service.setLiveCell(2,2);

    service.tick();

    expect(service.grid.isLive(1,1)).toBeFalse();
  });

  function verifyGridIsEmpty() {
    if (service.grid.rowCount() == 0) return;
    service.grid.liveRows.forEach((row, rowNum) => {
      row.forEach((col, colNum) => {
        expect(service.grid.isLive(colNum, rowNum))
          .withContext(`Expected column ${colNum}, Row ${rowNum} to be dead`)
          .toBeFalse();
      });
    })
  }

});
