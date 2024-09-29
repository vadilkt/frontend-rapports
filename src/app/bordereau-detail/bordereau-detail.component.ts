import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BorderauxService} from '../services/borderaux.service';
import {ActivatedRoute, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {faFilePdf, faFileWord} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bordereau-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './bordereau-detail.component.html',
  styleUrl: './bordereau-detail.component.scss'
})
export class BordereauDetailComponent implements OnInit {
  faFilePdf = faFilePdf;
  faFileWord = faFileWord;
  bordereau$!: any;
  borderauId: string = "";
  private subscription!: Subscription;

  constructor(private borderauxService: BorderauxService, private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.borderauId = this.route.snapshot.paramMap.get('bordereauId') || "0";
    this.borderauxService.read(this.borderauId).subscribe((data: any) => {
      this.bordereau$ = data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  export(format: string) {
    this.borderauxService.export(this.borderauId, format).subscribe((data: any) => {
      let file = new Blob([data], {type: 'application/pdf'});
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
  }
}
