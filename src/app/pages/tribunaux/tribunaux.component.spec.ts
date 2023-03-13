import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribunauxComponent } from './tribunaux.component';

describe('TribunauxComponent', () => {
  let component: TribunauxComponent;
  let fixture: ComponentFixture<TribunauxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TribunauxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TribunauxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
