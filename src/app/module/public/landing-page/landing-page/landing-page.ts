import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // تأكد من الـ Import ده

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrls: ['./landing-page.scss']
})
export class LandingPage {
  
  bookingData = {
    branch: '',
    service: '',
    fullName: '',
    phone: ''
  };

  constructor(private router: Router, private toastr: ToastrService) {}

  // دالة عشان تعمل سكرول لحد الفورم
  scrollToForm() {
    const formSection = document.getElementById('queue-form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  onSubmit() {


    this.toastr.success('You joined the queue successfully!', 'Success');
    this.router.navigate(['/queue']);
  }
}