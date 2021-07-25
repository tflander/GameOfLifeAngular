import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  minRow: number;
  maxRow: number;
  minCol: number;
  maxCol: number;
  liveRows: Map<number, Set<number>>;

  constructor() {
    this.minRow = Number.MAX_SAFE_INTEGER;
    this.maxRow = Number.MIN_SAFE_INTEGER;
    this.minCol = Number.MAX_SAFE_INTEGER;
    this.maxCol = Number.MIN_SAFE_INTEGER;
    this.liveRows = new Map;
  }

  setLiveCell(col: number, row: number) {
    this.setLiveCellInMap(col, row, this.liveRows)
    this.minRow = Math.min(row, this.minRow);
    this.maxRow = Math.max(row, this.maxRow);
    this.minCol = Math.min(col, this.minCol);
    this.maxCol = Math.max(col, this.maxCol);
  }

  setLiveCellInMap(col: number, row: number, rows: Map<number, Set<number>>) {
    let colset = rows.get(row);
    if(!colset)
      colset = new Set<number>();
    colset.add(col);
    rows.set(row, colset);
  }

  neighborsFor(col: number, row: number) {
    let count = 0;
    for(let r=row - 1; r <= row + 1; ++r) {
      let colset = this.liveRows.get(r);
      if(colset) {
        for (let c = col - 1; c <= col + 1; ++c) {
          if(c != col || r != row) {
            if (colset.has(c)) {
              ++count;
            }
          }
        }
      }
    }
    return count
  }

  isLive(col: number, row: number) {
    let colset = this.liveRows.get(row);
    if(!colset)
      return false;
    return colset.has(col);
  }

  tick() {
    let updatedLiveRows = new Map;
    let currRow = this.minRow;
    while (currRow <= this.maxRow) {
      let rows = this.liveRows.get(currRow);
      for (let col = this.minCol; col <= this.maxCol; ++col) {
        if(this.neighborsFor(col, currRow) == 2) {
          this.setLiveCellInMap(col, currRow, updatedLiveRows);
        }
      }
      ++currRow;
    }
    this.liveRows = updatedLiveRows;
    // TODO: adjust mins and max's
  }
}

