import { Component } from '@angular/core';

@Component({
    selector: 'my-sample-view',
    templateUrl: 'app/home/welcome.component.html'
})
export class WelcomeComponent {
    public pageTitle: string = 'Welcome to Dragnet Mobile Intercept APIs';
}
