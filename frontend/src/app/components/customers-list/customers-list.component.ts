import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  modalRef?: MdbModalRef<CustomerDetailsComponent>;
  customers: Customer[] = [];

  constructor(private customerService: CustomerService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.customerService.getAll()
      .subscribe(customers => this.customers = customers)
  }

  openModal(customer: Customer) {
    console.log(customer)
    // return
    this.modalRef = this.modalService.open(CustomerDetailsComponent, { data: { customer: customer }})
  }
}
