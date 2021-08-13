import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import { timer, of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-gameRunner',
  templateUrl: './gameRunner.component.html',
  styleUrls: ['./gameRunner.component.css']
})
export class GameRunnerComponent implements OnInit {

  game: string = "";
  timerSubs: Subscription | undefined


  constructor(private gameService: GameService) { }

  showGrid() {
    this.game = "TODO: Show the game grid " + Math.random();
  }

  ngOnInit(): void {
    // TODO: init the game
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
        this.showGrid();
        this.setTimerForGridUpdate();
      })
    })
  }

}
