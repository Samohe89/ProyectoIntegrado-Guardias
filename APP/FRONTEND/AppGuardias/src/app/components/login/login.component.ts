import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  formularioLogin: FormGroup;
  submit = false;
  
  @Output() loginOk = new EventEmitter<{rol:string, cursoAcademico: String}>();

  constructor(private form: FormBuilder) {
    this.formularioLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      cursoAcademico: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submit = true;
    if (this.formularioLogin.valid) {
      const { email, password, rol, cursoAcademico} = this.formularioLogin.value;
      this.loginOk.emit({rol, cursoAcademico});
    } else {
      console.log('Error en datos introducidos');
    }
  }

}
