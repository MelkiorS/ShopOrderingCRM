import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {ActivatedRoute, Params, Router} from '@angular/router'
import {MaterializecssService} from '../shared/services/materializecss.service'

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup

  constructor(private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      nickname: new FormControl(
        null,
        [Validators.required,
          Validators.minLength(3),
          Validators.maxLength(12)]
      ),
      password: new FormControl(
        null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterializecssService.toast('Now you can login')
      } else if (params['accessDenied']) {
        MaterializecssService.toast('Need to login first ')
      } else if (params['sessionFailed']) {
        MaterializecssService.toast('Please relogin')
      }
    })
  }

  onSubmit() {
    this.form.disable()

    this.authService.login(this.form.value).subscribe(
      () => this.router.navigate(['/overview']),
      error => {
        MaterializecssService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
