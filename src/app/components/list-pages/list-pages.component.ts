import { Component, OnInit, Inject } from '@angular/core';
import { IntegrationServiceService } from 'src/app/services/integration-service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.css']
})
export class ListPagesComponent implements OnInit {
  displayedColumns = ['logo', 'source', 'name', 'address', 'phone', 'rating', 'listed', 'action'];
  dataSource  = [];
  userId = localStorage.getItem("userID");
  accessToken = localStorage.getItem("accessToken");
  constructor(
    public _integrationService: IntegrationServiceService, 
    public _router: Router, 
    public _activatedRoute: ActivatedRoute, 
    private matDialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
    

    this._integrationService.getUserPages({userID:this.userId, accessToken: this.accessToken})
      .subscribe(
        (data) => {
          console.log(data);
          this.dataSource = data['data']
          // for (const page of data['data']) {
          //   page["source"] = "Facebook";
          //   page["address"] = "";
          //   page["phone"] = "";
          //   page["rating"] = "";


          // }
          // localStorage.setItem("name", data["name"])
          // localStorage.setItem("userID", data["id"])
          // localStorage.setItem("accessToken", response.authResponse["accessToken"])
          // this._router.navigate(['/list-pages'],
          // );
        }, // success path
        error => {
          console.log(error);
        } // error path
      );
  }

  openUpdate(element){
    const dialogRef = this.matDialog.open(DialogBodyComponent, {
      width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if(result != undefined){
        this._integrationService.postPageDetails(result).subscribe(
          (data) =>{
            this._snackBar.open("Updated Succesfully", "", {
              duration: 3000,
            });
            
          },
          error=>{
            console.log(error);
            
          }
        );
      }
    });
  }

}

@Component({
  selector: 'update-dialog',
  templateUrl: 'update-dialog.html',
})
export class DialogBodyComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogBodyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
