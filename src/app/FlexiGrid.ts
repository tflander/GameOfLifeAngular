export class FlexiGrid {
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

    let colset = this.liveRows.get(row);
    if(!colset)
      colset = new Set<number>();
    colset.add(col);
    this.liveRows.set(row, colset);


    this.minRow = Math.min(row, this.minRow);
    this.maxRow = Math.max(row, this.maxRow);
    this.minCol = Math.min(col, this.minCol);
    this.maxCol = Math.max(col, this.maxCol);
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

  asRows() {
    let stringGrid: string[] = [];
    let currRow = this.minRow;
    while (currRow <= this.maxRow) {
      let row = "";
      let rows = this.liveRows.get(currRow);
      for (let col = this.minCol; col <= this.maxCol; ++col) {
        if(rows && rows.has(col))
          row += 'X'
        else
          row += '.'
      }
      stringGrid.push(row);
      ++currRow;
    }
    return stringGrid;
  }

}
