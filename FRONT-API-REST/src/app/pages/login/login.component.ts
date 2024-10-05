
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Campo de email
      contraseña: ['', [Validators.required, Validators.minLength(5)]] // Campo de contraseña
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.valid)
      const { email, contraseña } = this.loginForm.value;
      this.authService.login({ email, contraseña }).subscribe(
        (response) => {
          console.log('Login exitoso', response);
          alert("Login Exitoso!!")
          console.log({"usuario": email,
                        "token": response.token
          })
          // Guardar el token en localStorage 
         localStorage.setItem('x-token', response.token);
         this.authService.getToken()
         this.router.navigate(['/usuarios'])
         
        
          
        },
        (error) => {
          console.error('Error en el login', error);
        }
      );
    }
  }
}
