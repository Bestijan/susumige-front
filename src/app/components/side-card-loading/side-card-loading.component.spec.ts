import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideCardLoadingComponent } from './side-card-loading.component';

describe('SideCardLoadingComponent', () => {
  let component: SideCardLoadingComponent;
  let fixture: ComponentFixture<SideCardLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideCardLoadingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SideCardLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
