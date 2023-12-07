import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWaitlistPageComponent } from './create-waitlist-page.component';

describe('CreateWaitlistPageComponent', () => {
  let component: CreateWaitlistPageComponent;
  let fixture: ComponentFixture<CreateWaitlistPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateWaitlistPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateWaitlistPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
