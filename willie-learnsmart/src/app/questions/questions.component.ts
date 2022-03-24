import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
})
export class QuestionsComponent implements OnInit {
  userName: string = '';
  userAge: any = 0;
  userTopic: string = '';
  userGoal: string = '';

  constructor() {}

  ngOnInit(): void {}

  createPlanBtn() {}

  addName(userName: string) {
    if (userName) {
      this.userName = userName;
    }
  }

  addAge(userAge: string) {
    if (userAge) {
      this.userAge = userAge;
    }
  }

  addTopic(userTopic: string) {
    if (userTopic) {
      this.userTopic = userTopic;
    }
  }

  addGoal(userGoal: string) {
    if (userGoal) {
      this.userGoal = userGoal;
    }
  }
}
