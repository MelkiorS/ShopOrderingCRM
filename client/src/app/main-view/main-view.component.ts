import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core'
import {AuthService} from '../shared/services/auth.service'
import {Router} from '@angular/router'
import {MaterializecssService} from '../shared/services/materializecss.service'

@Component({
  selector: 'main',
  templateUrl: 'main-view.component.html',
  styleUrls: ['main-view.component.css']
})
export class MainViewComponent implements AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef

  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Order'},
    {url: '/categories', name: 'Categories'}
  ]

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngAfterViewInit() {
    MaterializecssService.initializeFloatingButton(this.floatingRef)
  }

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
