import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoARGPComponent } from './logo-argp.component';

describe('LogoARGPComponent', () => {
  let component: LogoARGPComponent;
  let fixture: ComponentFixture<LogoARGPComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoARGPComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoARGPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
