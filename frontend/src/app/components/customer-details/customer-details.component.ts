import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Customer } from 'src/app/models/customer.model';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customer:Customer = new Customer()
  customerForm: FormGroup = new FormGroup({})

  constructor(public modalRef: MdbModalRef<CustomerDetailsComponent>) {

  }
  ngOnInit(): void {
    this.customerForm = this.createFormGroup()
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
    const result: Customer = Object.assign({}, this.customerForm.value) // deep copying the form-model
    console.log(result);
  }
  
}
