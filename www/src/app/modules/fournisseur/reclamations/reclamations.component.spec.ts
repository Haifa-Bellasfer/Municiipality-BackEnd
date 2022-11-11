import { ComponentFixture, TestBed } from '@angular/core/testing';

import { reclamationsComponent } from './reclamations.component';

describe('reclamationsComponent', () => {
  let component: reclamationsComponent;
  let fixture: ComponentFixture<reclamationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [reclamationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(reclamationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
