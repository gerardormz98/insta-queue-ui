import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistAdminPageComponent } from './waitlist-admin-page.component';

describe('WaitlistAdminPageComponent', () => {
  let component: WaitlistAdminPageComponent;
  let fixture: ComponentFixture<WaitlistAdminPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitlistAdminPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitlistAdminPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
