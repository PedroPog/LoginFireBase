import { Component, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { getAuth } from 'firebase/auth';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  teste: string = '';
  constructor(
    private auth: AuthService,
  ){}

  logout(){
    this.auth.logout();
  }

  user(){
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
  }
}
