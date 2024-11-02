import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedusersComponent } from './deletedusers.component';

describe('DeletedusersComponent', () => {
  let component: DeletedusersComponent;
  let fixture: ComponentFixture<DeletedusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
