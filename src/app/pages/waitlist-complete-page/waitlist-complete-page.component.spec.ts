import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistCompletePageComponent } from './waitlist-complete-page.component';

describe('WaitlistCompletePageComponent', () => {
  let component: WaitlistCompletePageComponent;
  let fixture: ComponentFixture<WaitlistCompletePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitlistCompletePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitlistCompletePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
