import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFournisseurComponent } from './dialog-fournisseur.component';

describe('DialogFournisseurComponent', () => {
  let component: DialogFournisseurComponent;
  let fixture: ComponentFixture<DialogFournisseurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogFournisseurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
