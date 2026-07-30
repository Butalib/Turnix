import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

interface EmployeeModel {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  branchId: number;
  branchName: string;
  serviceId: number;
  serviceName: string;
  counterNumber: number;
  status: 'online' | 'offline' | 'break';
  lastLogin: string;
  memberSince: string;
  avatar?: string;
  color?: string;
}

interface Branch {
  id: number;
  name: string;
}

interface Service {
  id: number;
  name: string;
  branchId: number;
}

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.scss',
})
export class Employee implements OnInit {

  private http = inject(HttpClient);
  private toastr = inject(ToastrService);

  // غيّر الروابط حسب الـ API بتاعك
  private employeesUrl = 'https://your-api.com/api/employees';
  private branchesUrl = 'https://your-api.com/api/branches';
  private servicesUrl = 'https://your-api.com/api/services'; // ?branchId=

  employees = signal<EmployeeModel[]>([]);
  branches = signal<Branch[]>([]);
  services = signal<Service[]>([]);

  // Search & Filter
  searchTerm = signal('');
  selectedStatus = signal('all');

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  // Modals
  showAddModal = signal(false);
  showEditModal = signal(false);
  showViewModal = signal(false);
  showDeleteModal = signal(false);

  selectedEmployee = signal<EmployeeModel | null>(null);
  employeeToDelete = signal<EmployeeModel | null>(null);

  // Add Form
  addForm = {
    fullName: '',
    email: '',
    phone: '',
    branchId: null as number | null,
    serviceId: null as number | null,
    counterNumber: null as number | null,
    password: '',
    confirmPassword: ''
  };

  // Edit Form
  editForm = {
    fullName: '',
    email: '',
    phone: '',
    branchId: null as number | null,
    serviceId: null as number | null,
    counterNumber: null as number | null,
    newPassword: '',
    confirmNewPassword: ''
  };

  // ngOnInit(): void {
  //   this.loadEmployees();
  //   this.loadBranches();
  // }

  ngOnInit(): void {
    // بيانات افتراضية مؤقتة عشان الاختبار
    this.branches.set([
      { id: 1, name: 'Mansoura Branch' },
      { id: 2, name: 'Cairo Branch' },
      { id: 3, name: 'Alexandria Branch' }
    ]);

    // بيانات موظفين افتراضية مؤقتة
    this.employees.set([
      {
        id: 1,
        fullName: 'Sarah Jenkins',
        email: 'sarah.j@turnix.com',
        phone: '+1 (555) 123-4567',
        branchId: 1,
        branchName: 'Mansoura Branch',
        serviceId: 1,
        serviceName: 'Dentistry',
        counterNumber: 3,
        status: 'online',
        lastLogin: 'Today, 09:12 AM',
        memberSince: 'Jan 2024',
        avatar: 'SJ',
        color: 'blue'
      },
      {
        id: 2,
        fullName: 'Mike Chen',
        email: 'mike.c@turnix.com',
        phone: '+1 (555) 987-6543',
        branchId: 2,
        branchName: 'Cairo Branch',
        serviceId: 2,
        serviceName: 'General Medicine',
        counterNumber: 1,
        status: 'offline',
        lastLogin: 'Yesterday, 05:30 PM',
        memberSince: 'Mar 2024',
        avatar: 'MC',
        color: 'purple'
      },
      {
        id: 3,
        fullName: 'Aisha Patel',
        email: 'aisha.p@turnix.com',
        phone: '+1 (555) 456-7890',
        branchId: 3,
        branchName: 'Alexandria Branch',
        serviceId: 3,
        serviceName: 'Radiology',
        counterNumber: 2,
        status: 'online',
        lastLogin: 'Today, 10:45 AM',
        memberSince: 'Feb 2024',
        avatar: 'AP',
        color: 'green'
      },
      {
        id: 4,
        fullName: 'David Kim',
        email: 'david.k@turnix.com',
        phone: '+1 (555) 321-0987',
        branchId: 2,
        branchName: 'Cairo Branch',
        serviceId: 2,
        serviceName: 'General Medicine',
        counterNumber: 1,
        status: 'offline',
        lastLogin: 'Yesterday, 02:15 PM',
        memberSince: 'Apr 2024',
        avatar: 'DK',
        color: 'orange'
      }
    ]);

    // this.loadEmployees(); // هتشكليها لما الباك يكون جاهز
    // this.loadBranches();
  }

  // ===================== LOAD DATA =====================
  loadEmployees() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.http.get<EmployeeModel[]>(this.employeesUrl).subscribe({
      next: (data) => {
        const mapped = data.map(emp => ({
          ...emp,
          avatar: emp.avatar || this.generateAvatar(emp.fullName),
          color: emp.color || this.generateColor(emp.fullName)
        }));
        this.employees.set(mapped);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load employees');
        this.isLoading.set(false);
      }
    });
  }

  loadBranches() {
    this.http.get<Branch[]>(this.branchesUrl).subscribe({
      next: (data) => this.branches.set(data),
      error: () => console.error('Failed to load branches')
    });
  }

  // loadServicesByBranch(branchId: number) {
  //   this.http.get<Service[]>(`${this.servicesUrl}?branchId=${branchId}`).subscribe({
  //     next: (data) => this.services.set(data),
  //     error: () => {
  //       this.services.set([]);
  //       console.error('Failed to load services');
  //     }
  //   });
  // }

  // قائمة الموظفين بعد البحث والفلتر
  filteredEmployees = computed(() => {
    let list = this.employees();

    // فلتر حسب الـ Status
    if (this.selectedStatus() !== 'all') {
      list = list.filter(emp => emp.status === this.selectedStatus());
    }

    // فلتر حسب البحث
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      list = list.filter(emp =>
        emp.fullName.toLowerCase().includes(term) ||
        emp.email.toLowerCase().includes(term) ||
        emp.phone.toLowerCase().includes(term)
      );
    }

    return list;
  });

  loadServicesByBranch(branchId: number) {
    // بيانات افتراضية مؤقتة (هتتشال لما الباك يبقى جاهز)
    if (branchId === 1) {
      this.services.set([
        { id: 1, name: 'Dentistry', branchId: 1 },
        { id: 2, name: 'Orthopedics', branchId: 1 },
        { id: 3, name: 'Radiology', branchId: 1 }
      ]);
    }
    else if (branchId === 2) {
      this.services.set([
        { id: 4, name: 'General Medicine', branchId: 2 },
        { id: 5, name: 'Pediatrics', branchId: 2 },
        { id: 6, name: 'Cardiology', branchId: 2 }
      ]);
    }
    else if (branchId === 3) {
      this.services.set([
        { id: 7, name: 'Dermatology', branchId: 3 },
        { id: 8, name: 'Neurology', branchId: 3 }
      ]);
    }
    else {
      this.services.set([]);
    }

    // لما الباك يبقى جاهز، هتشغلي الكود ده بدل اللي فوق:
    /*
    this.http.get<Service[]>(`${this.servicesUrl}?branchId=${branchId}`).subscribe({
      next: (data) => this.services.set(data),
      error: () => {
        this.services.set([]);
        console.error('Failed to load services');
      }
    });
    */
  }

  // ===================== ADD MODAL =====================
  openAddModal() {
    this.resetAddForm();
    this.services.set([]);
    this.showAddModal.set(true);
  }

  closeAddModal() {
    this.showAddModal.set(false);
  }

  // onAddBranchChange() {
  //   this.addForm.serviceId = null;
  //   this.services.set([]);

  //   if (this.addForm.branchId) {
  //     this.loadServicesByBranch(this.addForm.branchId);
  //   }
  // }

  onAddBranchChange() {
    this.addForm.serviceId = null;

    if (this.addForm.branchId === 1) {
      this.services.set([
        { id: 1, name: 'Dentistry', branchId: 1 },
        { id: 2, name: 'Orthopedics', branchId: 1 }
      ]);
    } else if (this.addForm.branchId === 2) {
      this.services.set([
        { id: 3, name: 'General Medicine', branchId: 2 },
        { id: 4, name: 'Pediatrics', branchId: 2 }
      ]);
    } else if (this.addForm.branchId === 3) {
      this.services.set([
        { id: 5, name: 'Cardiology', branchId: 3 },
        { id: 6, name: 'Dermatology', branchId: 3 }
      ]);
    } else {
      this.services.set([]);
    }
  }



  submitAddEmployee() {
    if (!this.addForm.fullName || !this.addForm.email || !this.addForm.phone ||
      !this.addForm.branchId || !this.addForm.serviceId || !this.addForm.counterNumber ||
      !this.addForm.password || !this.addForm.confirmPassword) {
      return;
    }

    if (this.addForm.password !== this.addForm.confirmPassword) {
      this.toastr.error('Passwords do not match');
      return;
    }

    const body = {
      fullName: this.addForm.fullName.trim(),
      email: this.addForm.email.trim(),
      phone: this.addForm.phone.trim(),
      branchId: this.addForm.branchId,
      serviceId: this.addForm.serviceId,
      counterNumber: this.addForm.counterNumber,
      password: this.addForm.password
    };

    this.http.post<EmployeeModel>(this.employeesUrl, body).subscribe({
      next: () => {
        this.closeAddModal();
        this.loadEmployees();
        this.showSuccess('Employee added successfully');
      },
      error: () => this.toastr.error('Failed to add employee')
    });
  }

  // ===================== VIEW MODAL =====================
  openViewModal(emp: EmployeeModel) {
    this.selectedEmployee.set(emp);
    this.showViewModal.set(true);
    this.toastr.info(`Viewing ${emp.fullName}'s details`);
  }

  closeViewModal() {
    this.showViewModal.set(false);
    this.selectedEmployee.set(null);
  }

  // ===================== EDIT MODAL =====================
  openEditModal(emp: EmployeeModel) {
    this.selectedEmployee.set(emp);
    this.toastr.info(`Editing ${emp.fullName}'s account`);

    this.editForm = {
      fullName: emp.fullName,
      email: emp.email,
      phone: emp.phone,
      branchId: emp.branchId,
      serviceId: emp.serviceId,
      counterNumber: emp.counterNumber,
      newPassword: '',
      confirmNewPassword: ''
    };

    this.loadServicesByBranch(emp.branchId);
    this.showEditModal.set(true);
  }

  closeEditModal() {
    this.showEditModal.set(false);
    this.selectedEmployee.set(null);
  }

  onEditBranchChange() {
    this.editForm.serviceId = null;
    this.services.set([]);

    if (this.editForm.branchId) {
      this.loadServicesByBranch(this.editForm.branchId);
    }
  }

  submitEditEmployee() {
    const emp = this.selectedEmployee();
    if (!emp) return;

    if (!this.editForm.fullName || !this.editForm.email || !this.editForm.phone ||
      !this.editForm.branchId || !this.editForm.serviceId || !this.editForm.counterNumber) {
      return;
    }

    if (this.editForm.newPassword || this.editForm.confirmNewPassword) {
      if (this.editForm.newPassword !== this.editForm.confirmNewPassword) {
        this.toastr.error('Passwords do not match');
        return;
      }
    }

    const body: any = {
      fullName: this.editForm.fullName.trim(),
      email: this.editForm.email.trim(),
      phone: this.editForm.phone.trim(),
      branchId: this.editForm.branchId,
      serviceId: this.editForm.serviceId,
      counterNumber: this.editForm.counterNumber
    };

    // فقط لو الباسورد مش فاضي
    if (this.editForm.newPassword) {
      body.password = this.editForm.newPassword;
    }

    this.http.put(`${this.employeesUrl}/${emp.id}`, body).subscribe({
      next: () => {
        this.closeEditModal();
        this.loadEmployees();
        this.showSuccess('Employee updated successfully');
      },
      error: () => this.toastr.error('Failed to update employee')
    });
  }

  // ===================== DELETE =====================
  openDeleteModal(emp: EmployeeModel) {
    this.employeeToDelete.set(emp);
    this.showDeleteModal.set(true);
    this.toastr.warning(`Deleting ${emp.fullName}'s account`);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
    this.employeeToDelete.set(null);
  }

  confirmDelete() {
    const emp = this.employeeToDelete();
    if (!emp) return;

    this.http.delete(`${this.employeesUrl}/${emp.id}`).subscribe({
      next: () => {
        this.closeDeleteModal();
        this.loadEmployees(); // مهم: مش بنمسح من الفرونت غير بعد نجاح الـ Request
        this.showSuccess('Employee deleted successfully');
      },
      error: () => this.toastr.error('Failed to delete employee')
    });
  }

  // ===================== HELPERS =====================
  showSuccess(msg: string) {
    this.successMessage.set(msg);
    this.toastr.success(msg);
    setTimeout(() => this.successMessage.set(''), 3000);
  }

  getStatusText(status: string): string {
    if (status === 'online') return 'Online';
    if (status === 'offline') return 'Offline';
    return 'On Break';
  }

  private resetAddForm() {
    this.addForm = {
      fullName: '',
      email: '',
      phone: '',
      branchId: null,
      serviceId: null,
      counterNumber: null,
      password: '',
      confirmPassword: ''
    };
  }

  private generateAvatar(name: string): string {
    const parts = name.trim().split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }

  private generateColor(name: string): string {
    const colors = ['blue', 'purple', 'green', 'orange', 'pink', 'teal', 'red'];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  }


}

