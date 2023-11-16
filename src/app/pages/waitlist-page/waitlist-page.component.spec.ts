import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitlistPageComponent } from './waitlist-page.component';

describe('WaitlistPageComponent', () => {
  let component: WaitlistPageComponent;
  let fixture: ComponentFixture<WaitlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaitlistPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WaitlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
