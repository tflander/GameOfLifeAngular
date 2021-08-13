import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRunnerComponent } from './gameRunner.component';

describe('GameengineComponent', () => {
  let component: GameRunnerComponent;
  let fixture: ComponentFixture<GameRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameRunnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
