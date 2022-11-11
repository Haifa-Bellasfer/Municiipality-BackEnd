import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsReclamComponent } from './details-reclam.component';

describe('DetailsReclamComponent', () => {
  let component: DetailsReclamComponent;
  let fixture: ComponentFixture<DetailsReclamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsReclamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsReclamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
