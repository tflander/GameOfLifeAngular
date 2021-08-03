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
    updatedLiveRows.minRow = this.grid.minRow;
    updatedLiveRows.maxRow = this.grid.maxRow;
    updatedLiveRows.minCol = this.grid.minCol;
    updatedLiveRows.maxCol = this.grid.maxCol;
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

  reInitEmpty(columns: number, rows: number) {
    this.grid.init(columns, rows);
  }

  reInitRandom(columns: number, rows: number) {
    this.reInitEmpty(columns, rows);

    let currRow = this.grid.minRow ;
    while (currRow <= this.grid.maxRow) {
      for (let col = this.grid.minCol; col <= this.grid.maxCol; ++col) {
        if (Math.random() < 0.5) {
          this.grid.setLiveCell(col, currRow);
        }
      }
      ++currRow;
    }

  }

  setGrid(gridForSetup: string[]) {
    gridForSetup.forEach((row, rowNum) => {
      for (let colNum = 0; colNum < row.length; colNum++) {
        if (row[colNum] === 'X') {
          this.grid.setLiveCell(colNum, rowNum);
        }
      }
    });
  }

}

