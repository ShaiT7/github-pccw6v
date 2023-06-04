import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyConverterHistoryComponent } from './currency-converter-history.component';

describe('CurrencyConverterHistoryComponent', () => {
  let component: CurrencyConverterHistoryComponent;
  let fixture: ComponentFixture<CurrencyConverterHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrencyConverterHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencyConverterHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
