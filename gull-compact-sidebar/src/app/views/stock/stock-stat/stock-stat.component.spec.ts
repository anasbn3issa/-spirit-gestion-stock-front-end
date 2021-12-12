import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockStatComponent } from './stock-stat.component';

describe('StockStatComponent', () => {
  let component: StockStatComponent;
  let fixture: ComponentFixture<StockStatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockStatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockStatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
