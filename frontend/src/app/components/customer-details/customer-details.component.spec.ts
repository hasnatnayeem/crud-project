import { OverlayContainer } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MdbModalModule, MdbModalRef, MdbModalService} from 'mdb-angular-ui-kit/modal';

import { CustomerDetailsComponent } from './customer-details.component';

@NgModule({
  declarations: [CustomerDetailsComponent],
  entryComponents: [CustomerDetailsComponent],
  imports: [HttpClientModule],
  providers: [MdbModalRef]
})
class TestModalModule {}


describe('CustomerDetailsComponent', () => {
  let modal: MdbModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let modalRef: MdbModalRef<CustomerDetailsComponent>
  let fixture: ComponentFixture<CustomerDetailsComponent>;

  beforeEach(fakeAsync(() => {
    const module = TestBed.configureTestingModule({
      imports: [MdbModalModule, TestModalModule],
    });

    TestBed.compileComponents();
    fixture = module.createComponent(CustomerDetailsComponent);
  }));
  

  beforeEach(inject(
    [MdbModalService, OverlayContainer, MdbModalRef , CustomerDetailsComponent],
    (mdbModal: MdbModalService, oc: OverlayContainer, mr: MdbModalRef<CustomerDetailsComponent>) => {
      modal = mdbModal;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
      modalRef = mr
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should open a modal with a  specified component', () => {
    modal.open(CustomerDetailsComponent);

    expect(overlayContainerElement.textContent).toContain('Customer details');

    const modalContainer = overlayContainerElement.querySelector('mdb-modal-container');
    expect(modalContainer).not.toBe(null);
  });
});
