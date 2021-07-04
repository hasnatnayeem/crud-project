import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { CustomerService } from 'src/app/services/customer.service';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CustomerDetailsComponent } from '../customer-details/customer-details.component';
import { EventQueueService } from 'src/app/services/event-queue/event-queue.service';
import { AppEventType } from 'src/app/services/event-queue/app-event-type.enum';
import { Subscription } from 'rxjs';
import { ComponentType } from '@angular/cdk/portal';


@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit, OnDestroy {
  modalRef?: MdbModalRef<CustomerDetailsComponent>;
  customers: Customer[] = [];
  deleteId: string;
  subscription?: Subscription;
  searchText = ''
  searchTextSubscription?: Subscription;

  constructor(
    private customerService: CustomerService,
    private modalService: MdbModalService,
    private eventQueue: EventQueueService
  ) {
    this.deleteId = ''
  }

  ngOnInit(): void {
    this.retrieveCustomers()
    this.subscription = this.eventQueue.on(AppEventType.customersChanged)
      .subscribe(() => this.retrieveCustomers());

    this.searchTextSubscription = this.eventQueue.on(AppEventType.searchTextChanged)
      .subscribe(event => {
        const newSearchText = event.payload
        this.searchText = newSearchText
        this.retrieveCustomers(this.searchText)
      })
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  retrieveCustomers(searchText = ''): void {
    this.customerService.getAll(searchText)
      .subscribe(customers => this.customers = customers)
  }

  openCustomerDetailsModal(customer: Customer = new Customer(), mode = 'new'): void {
    this.modalRef = this.modalService.open(CustomerDetailsComponent, { data: { customer: customer, mode: mode } })
  }

  closeModal(): void {
    this.modalRef?.close()
  }

  openDeleteDialog(component: ComponentType<CustomerDetailsComponent> | TemplateRef<CustomerDetailsComponent>,
    customer: Customer): void {

    if (!customer.id) customer.id = ''
    this.deleteId = customer.id
    this.modalRef = this.modalService.open(component, { data: { customer: customer } })
  }

  deleteCustomer(): void {
    this.customerService.delete(this.deleteId)
      .subscribe(() => {
        this.customers = this.customers.filter(customer => customer.id != this.deleteId)
        this.closeModal()
      })
  }

}
