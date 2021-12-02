import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLivreurComponent } from './delete-livreur.component';

describe('DeleteLivreurComponent', () => {
  let component: DeleteLivreurComponent;
  let fixture: ComponentFixture<DeleteLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
