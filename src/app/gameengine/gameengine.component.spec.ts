import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameengineComponent } from './gameengine.component';

describe('GameengineComponent', () => {
  let component: GameengineComponent;
  let fixture: ComponentFixture<GameengineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameengineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
