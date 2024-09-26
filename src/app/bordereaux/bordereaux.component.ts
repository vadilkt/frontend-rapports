import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BorderauxService } from '../services/borderaux.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapFilePdfFill, bootstrapFileWordFill } from '@ng-icons/bootstrap-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPdfViewerComponent } from '../modal/pdf-modal.component';
import { error } from 'console';

@Component({
  selector: 'app-bordereaux',
  standalone: true,
  imports: [CommonModule, RouterModule, 


  ],
  templateUrl: './bordereaux.component.html',
  styleUrl: './bordereaux.component.scss',
})
export class BordereauxComponent implements OnInit {
  bordereaux$!: any[];
  bordereauId:any;
  private subscription!: Subscription;

  constructor(private borderauxService: BorderauxService, private modalService:NgbModal) {}
  ngOnInit(): void {
    this.borderauxService.search().subscribe((data: any[]) => {
      this.bordereaux$ =  data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  openPdfModal(id:string):void{
    this.borderauxService.exportReport(id, 'pdf').subscribe(
      (pdfBlob: Blob)=>{
      const fileUrl = URL.createObjectURL(pdfBlob);
      const modalRef = this.modalService.open(ModalPdfViewerComponent, {size:'lg'});
      modalRef.componentInstance.pdfUrl = fileUrl;
    },
    (error)=>{
      console.error('Erreur lors de la récupération du PDF', error);
    }
  );
  }
}
