import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
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
      name: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      zipCode: new FormControl(),
    })
  }

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
