import { Injectable } from '@angular/core';
import {FlexiGrid} from "./FlexiGrid";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  grid: FlexiGrid;

  constructor() {
    this.grid = new FlexiGrid();
  }

  tick() {
    let updatedLiveRows = new FlexiGrid();
    let currRow = this.grid.minRow;
    while (currRow <= this.grid.maxRow) {
      for (let col = this.grid.minCol; col <= this.grid.maxCol; ++col) {
        if(this.grid.neighborsFor(col, currRow) == 2) {
          updatedLiveRows.setLiveCell(col, currRow);
        }
      }
      ++currRow;
    }
    this.grid = updatedLiveRows;
  }

  setLiveCell(col: number, row: number) {
    this.grid.setLiveCell(col, row);
  }

}

