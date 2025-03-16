import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoketsComponent } from './sokets.component';

describe('SoketsComponent', () => {
  let component: SoketsComponent;
  let fixture: ComponentFixture<SoketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SoketsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
