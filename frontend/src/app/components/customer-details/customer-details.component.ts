import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { AppEventType } from 'src/app/services/event-queue/app-event-type.enum';
import { AppEvent } from 'src/app/services/event-queue/app-event.class';
import { EventQueueService } from 'src/app/services/event-queue/event-queue.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  customer: Customer
  mode = ''
  searchText = ''
  customerForm: FormGroup
  subscription?: Subscription;

  constructor(
    public modalRef: MdbModalRef<CustomerDetailsComponent>,
    private customerService: CustomerService,
    private eventQueue: EventQueueService
  ) {
    this.customer = new Customer()
    this.customerForm = this.createFormGroup()
  }

  ngOnInit(): void {
    this.customerForm.reset(this.customer)
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.pattern("[0-9 \+]+"), Validators.maxLength(15)]),
      address: new FormControl(null, [Validators.maxLength(15)]),
      city: new FormControl(null, [Validators.maxLength(15)]),
      zipCode: new FormControl(null, [Validators.maxLength(15)]),
    })
  }

  // Getters to access from template
  get name(): AbstractControl | null { return this.customerForm.get('name'); }
  get email(): AbstractControl | null { return this.customerForm.get('email'); }
  get phone(): AbstractControl | null { return this.customerForm.get('phone'); }
  get address(): AbstractControl | null { return this.customerForm.get('address'); }
  get city(): AbstractControl | null { return this.customerForm.get('city'); }
  get zipCode(): AbstractControl | null { return this.customerForm.get('zipCode'); }

  // making different http request based on modal's mode
  onSubmit(): void {
    const data: Customer = Object.assign({}, this.customerForm.value) // deep copying the form-model

    if (this.mode === 'new') {
      this.customerService.create(data)
      .subscribe(result => {
        this.eventQueue.dispatch(new AppEvent(AppEventType.customersChanged, result));
        this.modalRef.close()
      })
    }
    else if (this.mode === 'edit') {
      const customerId = this.customer.id ? this.customer.id : ''
      this.customerService.update(customerId, data)
        .subscribe(() => {
          data.id = customerId
          this.eventQueue.dispatch(new AppEvent(AppEventType.customersChanged, data));
          this.modalRef.close()
        })

    }
  }

}
