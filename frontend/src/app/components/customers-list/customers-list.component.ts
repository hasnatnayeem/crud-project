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
  deleteId: any;

  constructor(private customerService: CustomerService, private modalService: MdbModalService) { }

  ngOnInit(): void {
    this.retrieveCustomers()
  }

  retrieveCustomers() {
    this.customerService.getAll()
      .subscribe(customers => this.customers = customers)
  }

  openModal(customer: Customer) {
    this.modalRef = this.modalService.open(CustomerDetailsComponent, { data: { customer: customer } })
  }

  closeModal() {
    this.modalRef?.close()
  }

  openDeleteDialog(component: any, customer: Customer) {
    this.deleteId = customer.id
    this.modalRef = this.modalService.open(component, { data: { customer: customer } })
  }

  deleteCustomer() {
    this.customerService.delete(this.deleteId)
      .subscribe(_ => {
        this.customers = this.customers.filter(customer => customer.id != this.deleteId)
        this.closeModal()
      })
  }
}
