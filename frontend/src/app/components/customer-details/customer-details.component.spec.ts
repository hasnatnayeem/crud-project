import { OverlayContainer } from '@angular/cdk/overlay';
import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { CustomerDetailsComponent } from './customer-details.component';



describe('CustomerDetailsComponent', () => {
  let modal: MdbModalService;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(fakeAsync(() => {
    TestBed.compileComponents();
  }));
  

  beforeEach(inject(
    [MdbModalService, OverlayContainer, MdbModalRef , CustomerDetailsComponent],
    (mdbModal: MdbModalService, oc: OverlayContainer) => {
      modal = mdbModal;
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }
  ));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  xit('should open a modal with a  specified component', () => {
    modal.open(CustomerDetailsComponent);

    expect(overlayContainerElement.textContent).toContain('Customer details');

    const modalContainer = overlayContainerElement.querySelector('mdb-modal-container');
    expect(modalContainer).not.toBe(null);
  });
});
