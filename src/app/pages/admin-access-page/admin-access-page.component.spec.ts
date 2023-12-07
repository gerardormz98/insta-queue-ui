import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccessPageComponent } from './admin-access-page.component';

describe('AdminAccessPageComponent', () => {
  let component: AdminAccessPageComponent;
  let fixture: ComponentFixture<AdminAccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccessPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
