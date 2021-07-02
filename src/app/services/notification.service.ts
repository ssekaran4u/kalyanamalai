import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private toastr: ToastrService) { }
  showSuccess(message, title){
      this.toastr.success(message, title, {progressBar:true, progressAnimation:'increasing'} )
  }
  showError(message, title){
      this.toastr.error(message, title, {progressBar:true, progressAnimation:'increasing'} )
  }
  showInfo(message, title){
      this.toastr.info(message, title, {progressBar:true, progressAnimation:'increasing'} )
  }
  showWarning(message, title){
      this.toastr.warning(message, title, {progressBar:true, progressAnimation:'increasing'} )
  }
}