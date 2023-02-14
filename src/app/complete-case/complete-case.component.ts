import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ConnectableObservable, map } from 'rxjs';
import { Case } from '../case';


@Component({
  selector: 'app-complete-case',
  templateUrl: './complete-case.component.html',
  styleUrls: ['./complete-case.component.css']
})
export class CompleteCaseComponent implements OnInit {

  case: Case = new Case;

  selectedIndex: number

  constructor(private apollo: Apollo, private http: HttpClient) { }

  tasklist = [];

  GET_CLAIMED_TASKS = gql`
{
  tasks(query: {assignee: "demo" ,  state: CREATED }) {
    id
  name
  processName
  assignee
  variables {
        value
        name
      }
  taskState
  
  }
}
`;

  COMPLETE_TASK = gql`
mutation completeTask ($taskId: String!, $variables: [VariableInput!]!) {
completeTask (taskId: $taskId, variables: $variables) {
    id
    name
    taskDefinitionId
    processName
    creationTime
    completionTime
    assignee
    variables {
      name
      value
    }
    taskState
    sortValues
    isFirst
    formKey
    processDefinitionId
    candidateGroups
}
}
`;

  onChange(event: Event) {
    console.log(this.tasklist)
    this.selectedIndex = event.target["selectedIndex"] - 1;
    this.case.caseType = this.tasklist[this.selectedIndex].variables[6].value.replace(/^"(.+(?="$))"$/, '$1');
    this.case.caseStatus = this.tasklist[this.selectedIndex].variables[5].value.replace(/^"(.+(?="$))"$/, '$1');
    this.case.investigationType = this.tasklist[this.selectedIndex].variables[11].value.replace(/^"(.+(?="$))"$/, '$1');
    this.case.caseCreator = this.tasklist[this.selectedIndex].variables[0].value.replace(/^"(.+(?="$))"$/, '$1');
    this.case.caseCreatorMail = this.tasklist[this.selectedIndex].variables[1].value.replace(/^"(.+(?="$))"$/, '$1');
    console.log(this.case)
  }

  completeCase() {
    this.completetask(this.tasklist[this.selectedIndex].id, this.case.caseStatus)
  }

  ngOnInit(): void {
    // https://dsm-1.tasklist.camunda.io/bb6d63fd-d49a-4d56-b32e-dd8f4164b14d/api/login
    this.http.post(`https://login.cloud.camunda.io/oauth/token`, {"client_id":"7ilnLy57inDNWa0DqDvT~B3NSLdHcIhq",
    "client_secret": "N6sNCDSb4rttLfO_R.NpIIeMF_7Z3LcuD2Amc-htDr18rNlD~SzK8yubfNY2.fKh",
    "audience":"tasklist.camunda.io",
    "grant_type":"client_credentials"}).subscribe((data: any) => {
    sessionStorage.setItem("token",data.access_token)
    }

    )

    this.getclaimedtask()
  }

  completetask(id: string, caseStatus) {

    this.apollo
      .mutate({
        mutation: this.COMPLETE_TASK,
        variables: {
          "taskId": id,
          "variables": {
            "name": "caseStatus",
            "value": '"' + caseStatus + '"'
          }
        }
      }).subscribe(data => { window.location.reload() })
  }

  getclaimedtask() {
    this.apollo
      .watchQuery({
        query: this.GET_CLAIMED_TASKS,
      })
      .valueChanges
      .pipe(
        map(result => result.data)
      ).subscribe((data: any) => {
        this.tasklist = data.tasks
      })
  }


}
