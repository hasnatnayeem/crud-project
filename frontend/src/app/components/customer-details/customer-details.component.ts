import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
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
export class CustomerDetailsComponent implements OnInit {
  customer: Customer = new Customer()
  customerForm: FormGroup

  constructor(
    public modalRef: MdbModalRef<CustomerDetailsComponent>,
    private customerService: CustomerService,
    private eventQueue: EventQueueService
  ) {
    this.customerForm = this.createFormGroup()
  }

  ngOnInit(): void {
    this.customerForm.reset(this.customer)
  }

  createFormGroup() {
    return new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required, Validators.maxLength(15)]),
      address: new FormControl(null, [Validators.maxLength(15)]),
      city: new FormControl(null, [Validators.maxLength(15)]),
      zipCode: new FormControl(null, [Validators.maxLength(15)]),
    })
  }

  get name() { return this.customerForm.get('name'); }
  get email() { return this.customerForm.get('email'); }
  get phone() { return this.customerForm.get('phone'); }
  get address() { return this.customerForm.get('address'); }
  get city() { return this.customerForm.get('city'); }
  get zipCode() { return this.customerForm.get('zipCode'); }

  onSubmit() {
    const data: Customer = Object.assign({}, this.customerForm.value) // deep copying the form-model
    const customerId = this.customer.id

    this.customerService.update(customerId, data)
      .subscribe(_ => {
        data.id = customerId
        this.eventQueue.dispatch(new AppEvent(AppEventType.customersChanged, data));
        this.modalRef.close()
      })
  }

}
