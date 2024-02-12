import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../service/client/client.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
  
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  requeridoFormControl = new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(
    private cientService: ClientService,
    private dialogRef: MatDialogRef<AddComponent>,
  ){}

  clientCreate: any = {    
    sharedKey: '',
    names: '',
    email: '',
    phone: '',
    dateAdd: '',
    dateEnd: ''
  };


  addClient(){
    this.cientService.addClient(this.clientCreate)
          .subscribe((data) => {this.dialogRef.close(true)}, err => {});
  }

}
