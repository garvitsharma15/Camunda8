import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { backend_url, url } from 'src/env';
import { Case } from '../case';

@Component({
  selector: 'app-create-case',
  templateUrl: './create-case.component.html',
  styleUrls: ['./create-case.component.css']
})
export class CreateCaseComponent {

  constructor(private http: HttpClient) { }

  case: Case = new Case;

  createCase() {
    console.log(this.case)
    this.http.post('http://'+backend_url+':8050/camunda/startProcess', this.case).subscribe(data=>{
      alert("case created with instance id "+data)
      window.location.assign("/");
    })
  }

  myFunction(){

      this.case.caseId = Math.floor(100000 + Math.random() * 900000).toString();
      this.case.caseType = "Member Intake";
      this.case.caseStatus = "OPEN";
      this.case.investigationType = "PRELIMINARY";
      this.case.caseCreator = "Henry Robert";
      this.case.caseCreatorMail = "garvitsharma15@gmail.com";
      this.case.caseLevel = "Primary";
      this.case.casePriority = "3";
      this.case.customerId= Math.floor(100000 + Math.random() * 900000).toString();
      this.case.customerMobile = "919878562334";
      this.case.customerAddress = "L & T House, Ballard Estate,Mumbai,Maharashtra";
      this.case.customerZipcode = "400001";

    
  }


}
