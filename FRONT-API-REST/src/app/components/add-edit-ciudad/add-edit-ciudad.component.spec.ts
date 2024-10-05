import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCiudadComponent } from './add-edit-ciudad.component';

describe('AddEditCiudadComponent', () => {
  let component: AddEditCiudadComponent;
  let fixture: ComponentFixture<AddEditCiudadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCiudadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditCiudadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
