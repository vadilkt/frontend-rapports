import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BorderauxService } from '../services/borderaux.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFilePdf, faFileWord } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bordereau-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './bordereau-detail.component.html',
  styleUrls: ['./bordereau-detail.component.scss']
})
export class BordereauDetailComponent implements OnInit, OnDestroy {
  faFilePdf = faFilePdf;
  faFileWord = faFileWord;
  private subscription!: Subscription;
  bordereau$!: any;
  bordereauId!: string;

  constructor(private borderauxService: BorderauxService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.bordereauId = this.route.snapshot.paramMap.get('bordereauId') || '0';
    this.subscription = this.borderauxService.read(this.bordereauId).subscribe((data: any) => {
      this.bordereau$ = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  downloadReportPdf(): void {
    this.borderauxService.exportReport(this.bordereauId, 'pdf').subscribe((data: Blob) => {
      this.downloadFile(data, 'application/pdf', 'bordereau.pdf');
    });
  }

  downloadReportWord(): void {
    this.borderauxService.exportReport(this.bordereauId, 'word').subscribe((data: Blob) => {
      this.downloadFile(data, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'bordereau.docx');
    });
  }

  private downloadFile(data: Blob, type: string, filename: string): void {
    const blob = new Blob([data], { type });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
