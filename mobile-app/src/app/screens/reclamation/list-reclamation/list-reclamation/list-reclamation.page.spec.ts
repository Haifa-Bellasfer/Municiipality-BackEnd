import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListReclamationPage } from './list-reclamation.page';

describe('ListReclamationPage', () => {
  let component: ListReclamationPage;
  let fixture: ComponentFixture<ListReclamationPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListReclamationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
