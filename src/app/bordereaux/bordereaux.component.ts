import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BorderauxService } from '../services/borderaux.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapFilePdfFill, bootstrapFileWordFill } from '@ng-icons/bootstrap-icons';
import { heroUsers } from '@ng-icons/heroicons/outline';

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
  private subscription!: Subscription;

  constructor(private borderauxService: BorderauxService) {}
  ngOnInit(): void {
    this.borderauxService.search().subscribe((data: any[]) => {
      this.bordereaux$ =  data;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
