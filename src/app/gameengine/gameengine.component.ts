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


  constructor(private gameService: GameService) { }

  showGrid() {
    this.rows = this.gameService.grid.asRows();
  }

  ngOnInit(): void {
    this.gameService.setLiveCell(0,0);
    this.gameService.setLiveCell(1,1);
    this.gameService.setLiveCell(2,2);
    this.gameService.setLiveCell(1,2);

    this.showGrid();
    this.setTimerForGridUpdate();
  }

  setTimerForGridUpdate() {
    let expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 500);
    let alertDate = new Date(expirationDate);
    alertDate.setTime(alertDate.getTime() - 300);
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
        this.showGrid();
        this.setTimerForGridUpdate();
      })
    })
  }

}
