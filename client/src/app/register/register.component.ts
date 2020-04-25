import {Component, OnDestroy, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'
import {MaterializecssService} from '../shared/services/materializecss.service'

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup

  constructor(private authService: AuthService,
              private router: Router) {
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
  }

  onSubmit() {
    this.form.disable()
    this.authService.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        MaterializecssService.toast(error.error.message)
        this.form.enable()
      }
    )
  }

}
