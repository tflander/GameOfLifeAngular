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
    let currRow = this.grid.minRow - 1;
    while (currRow <= this.grid.maxRow + 1) {
      for (let col = this.grid.minCol - 1; col <= this.grid.maxCol + 1; ++col) {
        let neighborCount = this.grid.neighborsFor(col, currRow)
        if (this.grid.isLive(col, currRow)) {
          if (neighborCount == 2 || neighborCount == 3) {
            updatedLiveRows.setLiveCell(col, currRow);
          }
        } else {
          if (neighborCount == 3) {
            updatedLiveRows.setLiveCell(col, currRow);
          }
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

