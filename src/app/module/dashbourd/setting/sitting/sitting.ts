import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sitting',
  standalone: false,
  templateUrl: './sitting.html',
  styleUrl: './sitting.scss',
})
export class Sitting {
  private toastr = inject(ToastrService);

  systemSettings = {
    queueName: 'Main Reception',
    defaultServiceTime: 15
  };

  saveChanges() {
    console.log('Saving new settings...', this.systemSettings);

    this.toastr.success(`Changes Saved! New service time is ${this.systemSettings.defaultServiceTime} Minutes.`);
  }
}
