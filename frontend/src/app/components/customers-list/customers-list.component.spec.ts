import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { CustomersListComponent } from './customers-list.component';
import { CustomerServiceMock } from '../../mocks/customer.service.mock';
import { CustomerService } from 'src/app/services/customer.service';
import { By } from '@angular/platform-browser';

describe('CustomersListComponent', () => {
  let component: CustomersListComponent;
  let fixture: ComponentFixture<CustomersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomersListComponent],
      imports: [HttpClientTestingModule, MdbModalModule],
      providers: [
        { provide: CustomerService, useClass: CustomerServiceMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have two customers`, (() => {
    expect(component.customers.length).toEqual(2);
  }));

  it(`should have button for adding new customer`, (() => {
    const buttonText = 'New customer'
    const button = fixture.debugElement.query(By.css('.btn-new-customer'));
    expect(button.nativeElement.textContent.trim()).toEqual(buttonText)
  }));


});
