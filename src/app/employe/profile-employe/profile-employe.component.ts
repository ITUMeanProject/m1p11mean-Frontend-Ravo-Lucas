import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-employe.component.html',
  styleUrls: ['./profile-employe.component.css']
})
export class ProfileEmployeComponent implements OnInit {
    form: FormGroup = new FormGroup({
		firstname: new FormControl(''),
        lastname: new FormControl(''),
		email: new FormControl(''),
        birthday: new FormControl('')
	});  
    errorMessage = "";
    submitting = false;
    submit_btn_text = "Modifier le profile";
	submitted = false;

    get f(): { [key: string]: AbstractControl } {
		return this.form.controls;
	}
    
    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
		this.form = this.formBuilder.group(
            {
                firstname: ['Toky', [Validators.required]],
                lastname: ['Lucas', [Validators.required]],
                email: ['mail@gmail', [Validators.required, Validators.email]],
                birthday: ['2001-08-19', [Validators.required]]
            }
		);
	}

    onSubmit(event: any){

    }

}
