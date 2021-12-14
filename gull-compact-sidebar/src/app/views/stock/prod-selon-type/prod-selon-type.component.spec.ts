import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdSelonTypeComponent } from './prod-selon-type.component';

describe('ProdSelonTypeComponent', () => {
  let component: ProdSelonTypeComponent;
  let fixture: ComponentFixture<ProdSelonTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProdSelonTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdSelonTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
