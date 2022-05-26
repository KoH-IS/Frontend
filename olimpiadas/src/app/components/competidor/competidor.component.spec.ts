import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetidorComponent } from './competidor.component';

describe('CompetidorComponent', () => {
  let component: CompetidorComponent;
  let fixture: ComponentFixture<CompetidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetidorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
