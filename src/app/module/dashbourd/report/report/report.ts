import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface ReportRecord {
  id: number;
  date: string;
  served: number;
  avgWait: string;
  avgService: string;
  skipped: number;
}

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report.html',
  styleUrl: './report.scss'
})
export class ReportsComponent implements OnInit {

  private toastr = inject(ToastrService);

  // Stats (مؤقتة)
  stats = signal({
    customersServed: 142,
    avgWaitingTime: '14m',
    avgServiceTime: '08m',
    skippedTickets: 5
  });

  // بيانات الجدول (مؤقتة)
  records = signal<ReportRecord[]>([
    { id: 1, date: 'Oct 26, 2023', served: 142, avgWait: '14m', avgService: '08m', skipped: 5 },
    { id: 2, date: 'Oct 25, 2023', served: 128, avgWait: '16m', avgService: '09m', skipped: 3 },
    { id: 3, date: 'Oct 24, 2023', served: 156, avgWait: '18m', avgService: '10m', skipped: 8 },
    { id: 4, date: 'Oct 23, 2023', served: 110, avgWait: '12m', avgService: '08m', skipped: 2 },
    { id: 5, date: 'Oct 22, 2023', served: 134, avgWait: '15m', avgService: '09m', skipped: 4 },
    { id: 6, date: 'Oct 21, 2023', served: 96, avgWait: '11m', avgService: '07m', skipped: 1 },
  ]);

  searchTerm = signal('');
  selectedDate = signal('all');

  filteredRecords = computed(() => {
    let list = this.records();
    const term = this.searchTerm().toLowerCase().trim();

    if (term) {
      list = list.filter(r =>
        r.date.toLowerCase().includes(term) ||
        r.served.toString().includes(term)
      );
    }
    return list;
  });

  ngOnInit(): void {
    // لما الباك يبقى جاهز هتجيبي البيانات من هنا
  }

  exportReport() {
  }
}