import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
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
    this.http.post('http://localhost:8080/camunda/startProcess', this.case).subscribe(data=>{
      alert("case created with instance id "+data)
      window.location.reload();
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


    // (<HTMLInputElement>document.getElementById("caseId-input")).value = Math.floor(100000 + Math.random() * 900000).toString();
    // (<HTMLInputElement>document.getElementById("caseType-selected")).value = "Member Intake";
    // (<HTMLInputElement>document.getElementById("caseStatus-selected")).value = "OPEN";
    // (<HTMLInputElement>document.getElementById("caseInvestType-selected")).value = "PRELIMINARY";
    // (<HTMLInputElement>document.getElementById("caseCreator-input")).value = "Henry Robert";
    // (<HTMLInputElement>document.getElementById("caseCreatorMail-input")).value = "garvitsharma15@gmail.com";
    // (<HTMLInputElement>document.getElementById("caseLevel-input")).value = "Primary";
    // (<HTMLInputElement>document.getElementById("casePriority-selected")).value = "3";
    // (<HTMLInputElement>document.getElementById("customerId-input")).value = Math.floor(100000 + Math.random() * 900000).toString();
    // (<HTMLInputElement>document.getElementById("customerMobile-input")).value = "919878562334";
    // (<HTMLInputElement>document.getElementById("customerAddress-input")).value = "L & T House, Ballard Estate,Mumbai,Maharashtra";
    // (<HTMLInputElement>document.getElementById("customerZipcode-input")).value = "400001";
    
  }


}
