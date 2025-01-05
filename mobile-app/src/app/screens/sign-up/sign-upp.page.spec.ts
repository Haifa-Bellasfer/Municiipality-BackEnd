import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUppPage } from './sign-upp.page';

describe('SignUppPage', () => {
  let component: SignUppPage;
  let fixture: ComponentFixture<SignUppPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SignUppPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
