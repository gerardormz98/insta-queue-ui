import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnqueuePageComponent } from './enqueue-page.component';

describe('EnqueuePageComponent', () => {
  let component: EnqueuePageComponent;
  let fixture: ComponentFixture<EnqueuePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnqueuePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnqueuePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
