import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";

@Component({
  selector: 'app-gameengine',
  templateUrl: './gameengine.component.html',
  styleUrls: ['./gameengine.component.css']
})
export class GameengineComponent implements OnInit {

  rows: string[] = [];

  constructor(private gameService: GameService) { }

  showGrid() {
    let currRow = this.gameService.minRow;
    while (currRow <= this.gameService.maxRow) {
      let row = "";
      let rows = this.gameService.liveRows.get(currRow);
      for (let col = this.gameService.minCol; col <= this.gameService.maxCol; ++col) {
        if(rows && rows.has(col))
          row += 'X'
        else
          row += '.'
      }
      this.rows.push(row);
      ++currRow;
    }
  }

  ngOnInit(): void {
    this.gameService.setLiveCell(0,0);
    this.gameService.setLiveCell(1,1);
    this.gameService.setLiveCell(2,2);
    this.gameService.setLiveCell(1,2);

    this.showGrid();
  }

}
