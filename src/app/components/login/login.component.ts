import { Component, OnInit, NgZone } from '@angular/core';
import { IntegrationServiceService } from 'src/app/services/integration-service.service';
import { Router } from '@angular/router';
declare var FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(public _integrationService: IntegrationServiceService, public _router: Router, private ngZone: NgZone) { }

  ngOnInit() {

    (window as any).fbAsyncInit = function () {
      FB.init({
        appId: '455135988688199',
        cookie: true,
        xfbml: true,
        version: 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  submitLogin() {
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response) => {
      console.log('submitLogin', response);
      if (response.authResponse) {
        //login success
        //login success code here
        //redirect to home page
        this._integrationService.validateUser(response.authResponse)
          .subscribe(
            (data) => { console.log(data);
              localStorage.setItem("name", data["name"])
              localStorage.setItem("userID", data["id"])
              localStorage.setItem("accessToken", response.authResponse["accessToken"])
              
              this.ngZone.run(() => this._router.navigateByUrl('/list-pages'));
            }, // success path
            error => { console.log(error);
            } // error path
          );
          // .subscribe((result) => {
          //   console.log(result);
            

          // },
          //   (error) => {
          //     // console.log("error");
          //     // console.log(error);
          //   });
      }
      else {
        console.log('User login failed');
      }
    });

  }

}
