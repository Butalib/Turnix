import { Component  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sitting',
  standalone: false,
  templateUrl: './sitting.html',
  styleUrl: './sitting.scss',
})
export class Sitting {
  systemSettings = {
    queueName: 'Main Reception',
    defaultServiceTime: 15
  };

  saveChanges() {
    // هنا بنجمع الداتا ونبعتها للباك إند
    console.log('Saving new settings...', this.systemSettings);
    
    // رسالة مؤقتة للتأكيد (لحد ما توصلها بالـ API)
    alert(`Changes Saved! New service time is ${this.systemSettings.defaultServiceTime} Minutes.`);
  }
}
