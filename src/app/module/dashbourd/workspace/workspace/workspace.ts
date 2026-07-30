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
  
  currentTicket = {
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
}