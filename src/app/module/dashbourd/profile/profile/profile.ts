import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {

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
    alert('Profile information updated successfully!');
  }

  updatePassword() {
    if (this.securityData.newPassword !== this.securityData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    console.log('Updating Password...', this.securityData);
    alert('Password updated successfully!');
    this.securityData = { currentPassword: '', newPassword: '', confirmPassword: '' };
  }

  triggerImageUpload() {
    alert('Upload image dialog will open here');
  }

}

