import { Component, } from '@angular/core';



export interface QueueItem {
  pos: number;
  ticket: string;
  customer: string;
  service: string;
  joinedAt: string;
  waitTime: string;
  status: string;
}
@Component({
  selector: 'app-workspace',
  standalone: false,
  templateUrl: './workspace.html',
  styleUrls: ['./workspace.scss']
})
export class Workspace {
  
  currentDate = new Date();
  stats = {
    waiting: 12,
    serving: 3,
    completed: 45,
    avgWait: '14m'
  };
  
  currentTicket : any = {
    number: 'A098',
    customerName: 'John Doe',
    phone: '+1 (555) 0123',
    service: 'Returns',
    joinedAt: '02:10 PM'
  };
  waitingQueue: QueueItem[] = [
  { pos: 1, ticket: 'A099', customer: 'Sarah Jenkins', service: 'Returns', joinedAt: '02:10 PM', waitTime: '12m', status: 'Waiting' },
  { pos: 2, ticket: 'B042', customer: 'Mike Chen', service: 'Tech Support', joinedAt: '02:14 PM', waitTime: '08m', status: 'Waiting' },
  { pos: 3, ticket: 'A100', customer: 'Emily Davis', service: 'General Inquiry', joinedAt: '02:16 PM', waitTime: '06m', status: 'Waiting' },
  { pos: 4, ticket: 'A101', customer: 'David Wilson', service: 'Billing', joinedAt: '02:18 PM', waitTime: '04m', status: 'Waiting' },
];


// الفانكشن الأولى: لما الموظف يخلص العميل الحالي
completeCurrentService() {
  // 1. نتأكد إن في عميل أصلاً
  if (!this.currentTicket) return;

  // 2. نزود الإحصائيات (نزود Completed وننقص Serving)
  this.stats.completed++;
  this.stats.serving--;

  // 3. نفضي مكان العميل الحالي
  // this.currentTicket = null; // لو عايز تسيبها فاضية، بس الأحسن ننده اللي بعده أوتوماتيك

  // 4. ننده على اللي بعده
  this.callNextInQueue();
}

// الفانكشن التانية: بتسحب أول واحد من الطابور
callNextInQueue() {
  if (this.waitingQueue.length === 0) {
    alert('الطابور فاضي يا وحش، اشرب قهوتك!');
    this.currentTicket = null; // مفيش حد بيخدمه
    return;
  }

  // shift() بتمسح أول عنصر في المصفوفة وبترجعهولنا
  const nextCustomer = this.waitingQueue.shift(); 
  
  if (nextCustomer) {
    // بننقل الداتا من الطابور للتذكرة الحالية (بنوحد أسماء الخصائص)
    this.currentTicket = {
      number: nextCustomer.ticket,
      customerName: nextCustomer.customer,
      phone: '+1 (555) ' + Math.floor(1000 + Math.random() * 9000), // رقم عشوائي للتجربة
      service: nextCustomer.service,
      joinedAt: nextCustomer.joinedAt
    };

    // نحدث الإحصائيات
    this.stats.waiting = this.waitingQueue.length;
    this.stats.serving++;
  }
}

// الفانكشن التالتة: لو الموظف اختار عميل معين من الجدول (الزرار الأزرق)
callSpecificCustomer(ticketNumber: string) {
  // 1. ندور على العميل في الطابور
  const index = this.waitingQueue.findIndex(item => item.ticket === ticketNumber);
  
  if (index !== -1) {
    // 2. نسحب العميل ده تحديداً من المصفوفة باستخدام splice
    const selectedCustomer = this.waitingQueue.splice(index, 1)[0];
    
    // لو كان في عميل حالي، هنمشيه (أو نقفله)
    if (this.currentTicket) {
      this.stats.completed++; // بنفترض إنه خلص
      this.stats.serving--;
    }

    // 3. نحط العميل الجديد في الشاشة
    this.currentTicket = {
      number: selectedCustomer.ticket,
      customerName: selectedCustomer.customer,
      phone: '+1 (555) 0000',
      service: selectedCustomer.service,
      joinedAt: selectedCustomer.joinedAt
    };

    // 4. نحدث الإحصائيات
    this.stats.waiting = this.waitingQueue.length;
    this.stats.serving++;
  }
} 
// الفانكشن الأولى: Skip (تخطي العميل اللي مجاش)
skipCustomer() {
  if (!this.currentTicket) return;

  // الإحصائيات: بننقص الـ Serving بس، مش بنزود Completed
  this.stats.serving--;

  // بننده اللي بعده فوراً (زي ما تكون في بنك وتدوس الزرار بسرعة)
  this.callNextInQueue();
}

// الفانكشن التانية: Cancel (إلغاء التذكرة الحالية)
cancelTicket() {
  if (!this.currentTicket) return;

  // الإحصائيات: بننقص الـ Serving بس
  this.stats.serving--;

  // بنفضي مكان التذكرة الحالية (مش بننده اللي بعده أوتوماتيك)
  this.currentTicket = null; 
}
}