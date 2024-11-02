import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedproductsComponent } from './deletedproducts.component';

describe('DeletedproductsComponent', () => {
  let component: DeletedproductsComponent;
  let fixture: ComponentFixture<DeletedproductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedproductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedproductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
