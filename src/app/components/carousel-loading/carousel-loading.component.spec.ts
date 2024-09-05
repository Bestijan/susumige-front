import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselLoadingComponent } from './carousel-loading.component';

describe('CarouselLoadingComponent', () => {
  let component: CarouselLoadingComponent;
  let fixture: ComponentFixture<CarouselLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
