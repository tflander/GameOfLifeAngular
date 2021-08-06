import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import { timer, of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-gameengine',
  templateUrl: './gameengine.component.html',
  styleUrls: ['./gameengine.component.css']
})
export class GameengineComponent implements OnInit {

  rows: string[] = [];
  timerSubs: Subscription | undefined
  generation = 0
  columnCount = 0
  rowCount = 0


  constructor(private gameService: GameService) { }

  showGrid() {
    this.rows = this.gameService.grid.asRows()
    this.columnCount = this.gameService.grid.columnCount()
    this.rowCount = this.gameService.grid.rowCount()
  }

  ngOnInit(): void {
    // this.gameService.reInitRandom(10,10);
    // this.initWithGliderGun();
    // this.initWithDoubleGliderGun();
    this.initWithQuadGliderGun();

    this.showGrid();
    this.setTimerForGridUpdate();
  }

  setTimerForGridUpdate() {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 300);
    let alertDate = new Date(expirationDate);
    alertDate.setTime(alertDate.getTime() - 100);
    let timeDuration = (expirationDate.getTime() - alertDate.getTime());
    this._startTimer(timeDuration);
  }

  private _startTimer(timeDuration: number | Date | undefined) {
    if (this.timerSubs) {
      this.timerSubs.unsubscribe();
    }

    this.timerSubs = timer(timeDuration).subscribe((data) => {
      of({token: Math.random()}).pipe(delay(200)).subscribe((apiData) => {
        this.gameService.tick();
        this.generation++;
        this.showGrid();
        this.setTimerForGridUpdate();
      })
    })
  }

  private initWithGliderGun() {
    this.gameService.setGrid([
      ".........................X...........",
      ".......................X.X...........",
      ".............XX......XX............XX",
      "............X...X....XX............XX",
      ".XX........X.....X...XX..............",
      ".XX........X...X.XX....X.X...........",
      "...........X.....X.......X...........",
      "............X...X....................",
      ".............XX......................",
    ])
  }

  private initWithDoubleGliderGun() {
    this.gameService.setGrid([
      "...........X....................................................X...........",
      "...........X.X................................................X.X...........",
      "XX............XX......XX............................XX......XX............XX",
      "XX............XX....X...X..........................X...X....XX............XX",
      "..............XX...X.....X........XX....XX........X.....X...XX..............",
      "...........X.X....XX.X...X........XX....XX........X...X.XX....X.X...........",
      "...........X.......X.....X........................X.....X.......X...........",
      "....................X...X..........................X...X....................",
      "......................XX............................XX......................",
    ])
  }

  private initWithQuadGliderGun() {
    this.gameService.setGrid([
      "......................XX............................XX......................",
      "....................X...X..........................X...X....................",
      "...........X.......X.....X........................X.....X.......X...........",
      "...........X.X....XX.X...X........XX....XX........X...X.XX....X.X...........",
      "..............XX...X.....X........XX....XX........X.....X...XX..............",
      "XX............XX....X...X..........................X...X....XX............XX",
      "XX............XX......XX............................XX......XX............XX",
      "...........X.X................................................X.X...........",
      "...........X....................................................X...........",
      "............................................................................",
      "............................................................................",
      "............................................................................",
      "...........X....................................................X...........",
      "...........X.X................................................X.X...........",
      "XX............XX......XX............................XX......XX............XX",
      "XX............XX....X...X..........................X...X....XX............XX",
      "..............XX...X.....X........XX....XX........X.....X...XX..............",
      "...........X.X....XX.X...X........XX....XX........X...X.XX....X.X...........",
      "...........X.......X.....X........................X.....X.......X...........",
      "....................X...X..........................X...X....................",
      "......................XX............................XX......................",
    ])
  }

}
