import { Component, Input } from "@angular/core";
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal-bordereau-viewer',
    templateUrl: './pdf-modal.component.html',
})

export class ModalPdfViewerComponent{
    @Input() pdfUrl!: string;

    constructor(public activeModal: NgbActiveModal){}
}