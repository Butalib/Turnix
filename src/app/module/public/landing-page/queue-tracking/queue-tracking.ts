import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-queue-tracking',
  templateUrl: './queue-tracking.html',
  styleUrls: ['./queue-tracking.scss']
})
export class QueueTrackingComponent { 
  // 2. اعمل Inject للراوتر في الكونستراكتور
  constructor(private router: Router) {}

  // 3. الفانكشن اللي هترجعك للصفحة الرئيسية
  goHome() {
    this.router.navigate(['/']);
  }
}