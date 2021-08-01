import { TestBed } from '@angular/core/testing';
import {FlexiGrid} from "./FlexiGrid";


describe('GameService', () => {
  let grid: FlexiGrid;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    grid = new FlexiGrid();
  });

  it('should be created', () => {
    expect(grid).toBeTruthy();
  });

  it('creates the game', () => {
    expect(grid.minRow).toEqual(Number.MAX_SAFE_INTEGER)
    expect(grid.maxRow).toEqual(Number.MIN_SAFE_INTEGER);
    expect(grid.minCol).toEqual(Number.MAX_SAFE_INTEGER)
    expect(grid.maxCol).toEqual(Number.MIN_SAFE_INTEGER);
    expect(grid.liveRows)
  });

  it('allows you to set a live cell', () => {
    grid.setLiveCell(2,3);
    expect(grid.minRow).toEqual(3)
    expect(grid.maxRow).toEqual(3);
    expect(grid.minCol).toEqual(2)
    expect(grid.maxCol).toEqual(2);
    expect(grid.liveRows.get(3)).toEqual(new Set().add(2))
  });

  it('allows you to add a live cell to a row', () => {
    grid.setLiveCell(2,3);
    grid.setLiveCell(4,3);
    expect(grid.minRow).toEqual(3)
    expect(grid.maxRow).toEqual(3);
    expect(grid.liveRows.get(3)).toEqual(new Set().add(2).add(4))
  });

  it('allows you to add a new row to the game', () => {
    grid.setLiveCell(2,3);
    grid.setLiveCell(4,5);
    expect(grid.minRow).toEqual(3)
    expect(grid.maxRow).toEqual(5);
    expect(grid.liveRows.get(3)).toEqual(new Set().add(2))
    expect(grid.liveRows.get(5)).toEqual(new Set().add(4))
  });

  it('allows you to set a live cell idempotent', () => {
    grid.setLiveCell(2,3);
    grid.setLiveCell(4,5);
    grid.setLiveCell(4,5);
    expect(grid.minRow).toEqual(3)
    expect(grid.maxRow).toEqual(5);
    expect(grid.liveRows.get(3)).toEqual(new Set().add(2))
    expect(grid.liveRows.get(5)).toEqual(new Set().add(4))
  });

  it('counts neighbors', () => {
    grid.setLiveCell(0,0);
    grid.setLiveCell(0,1);
    grid.setLiveCell(1,0);
    grid.setLiveCell(1,1);

    expect(grid.isLive(1,1)).toBeTrue();
    expect(grid.isLive(1,2)).toBeFalse();
    expect(grid.isLive(2,1)).toBeFalse();
    expect(grid.neighborsFor(0,0)).toEqual(3)
    expect(grid.neighborsFor(2,2)).toEqual(1)
    expect(grid.neighborsFor(3,3)).toEqual(0)
  });

  it('gives the row count', () => {
    expect(grid.rowCount()).toBe(0);
    grid.setLiveCell(1,1);
    expect(grid.rowCount()).toBe(1);
  });

  it('gives the column count', () => {
    expect(grid.columnCount()).toBe(0);
    grid.setLiveCell(1,1);
    expect(grid.columnCount()).toBe(1);
  });

});
