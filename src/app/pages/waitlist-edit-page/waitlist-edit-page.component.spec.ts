import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistEditPageComponent } from './waitlist-edit-page.component';

describe('WaitlistEditPageComponent', () => {
  let component: WaitlistEditPageComponent;
  let fixture: ComponentFixture<WaitlistEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitlistEditPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitlistEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
