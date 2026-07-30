import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

  private toastr = inject(ToastrService);

  userProfile = {
    fullName: 'Butalib',
    jobTitle: 'Ternix Team',
    email: 'admin@turnix.com',
    phone: '+20 1029554280',
    memberSince: 'January 2024',
    employeeId: 'TX-9021',
    roleLevel: 'Administrator',
    lastLogin: 'Today, 08:42 AM',
    avatar: 'assets/images/avatar.jpg'
  };

  securityData = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  saveProfileChanges() {
    console.log('Saving Profile...', this.userProfile);
    this.toastr.success('Profile information updated successfully!');
  }

  updatePassword() {
    if (this.securityData.newPassword !== this.securityData.confirmPassword) {
      this.toastr.error('Passwords do not match!');
      return;
    }
    console.log('Updating Password...', this.securityData);
    this.toastr.success('Password updated successfully!');
    this.securityData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  triggerImageUpload() {
    this.toastr.info('Upload image dialog will open here');
  }

}

