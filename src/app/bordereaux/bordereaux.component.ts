import {Component, OnInit, TemplateRef} from '@angular/core';
import {Subscription} from 'rxjs';
import {BorderauxService} from '../services/borderaux.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {faFilePdf, faFileWord} from "@fortawesome/free-solid-svg-icons";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-bordereaux',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent,
  ],
  templateUrl: './bordereaux.component.html',
  styleUrl: './bordereaux.component.scss',
  providers: [BsModalService],
})
export class BordereauxComponent implements OnInit {
  user!: any;
  modalRef?: BsModalRef;
  bordereaux$!: any[];
  bordereau$!: any;
  pdfSrc: SafeResourceUrl | null = null;
  borderauId: string = "";
  protected readonly faFilePdf = faFilePdf;
  protected readonly faFileWord = faFileWord;
  private subscription!: Subscription;

  constructor(private borderauxService: BorderauxService,
              private modalService: BsModalService,
              private sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.borderauxService.search().subscribe((data: any[]) => {
      this.bordereaux$ = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  openModal(viewFileModal: TemplateRef<any>,
            id: number
  ) {

    if (id) {
      this.borderauId = `${id}`;
      this.borderauxService.export(`${id}`, 'pdf').subscribe((data: any) => {
        const byteArray = new Uint8Array(data);
        const arrayBuffer: ArrayBuffer = byteArray.buffer;

        // Convert the ArrayBuffer to a Blob of type 'application/pdf'
        const blob = new Blob([arrayBuffer], {type: 'application/pdf'});

        // Create an object URL from the Blob
        const objectUrl = URL.createObjectURL(blob);

        // Sanitize the object URL before assigning it to the iframe source
        this.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(objectUrl);
      });
      this.modalRef = this.modalService.show(viewFileModal, {class: "pdf-modal modal-lg"});
    }
  }

  export(format: string) {
    this.borderauxService.export(this.borderauId, format).subscribe((data: any) => {
      let file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }

  exitModal = (): void => {
    this.modalRef?.hide();
  };
}
