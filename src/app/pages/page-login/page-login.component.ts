import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpService} from '../../services/http/http.service';

@Component({
  selector: 'app-page-login',
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss']
})
export class PageLoginComponent implements OnInit {
    loginForm: FormGroup;
    errorMessage = '';
    loading = false;

    constructor(private router: Router,
                public httpSv: HttpService) { }

    ngOnInit() {
        this.httpSv.logout();
        this.loginForm = new FormGroup({
            login: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required])
        });
    }

    Login(): void {
        this.loading = true;
        this.httpSv.login('/requests/new', this.loginForm.value.login, this.loginForm.value.password).subscribe(
            data => {
                this.httpSv.username = this.loginForm.value.login;
                this.httpSv.password = this.loginForm.value.password;
                this.router.navigate(['/horizontal/request-new']);
                this.loading = false;
                setTimeout(() => {
                    this.httpSv.goToLogin();
                }, 3600000);
            },
            err => {
                if (err.status === 401) {
                    this.errorMessage = 'Erreur d\'authentification';
                } else {
                    this.errorMessage = 'Serveur injoignable';
                }
                this.loading = false;
                setTimeout(() => {
                    this.errorMessage = '';
                }, 5000);
            }
        );
    }
}
