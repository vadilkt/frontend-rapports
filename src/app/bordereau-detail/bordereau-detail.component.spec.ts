import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BordereauDetailComponent } from './bordereau-detail.component';

describe('BordereauDetailComponent', () => {
  let component: BordereauDetailComponent;
  let fixture: ComponentFixture<BordereauDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BordereauDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BordereauDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
