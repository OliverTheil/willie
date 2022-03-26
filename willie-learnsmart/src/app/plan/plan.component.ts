import { Component, OnInit } from '@angular/core';
import { Answers } from '../models/answers.class';
import { Plan } from '../models/plan.class';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  answers: Answers;
  plan: Plan;

  constructor() {}

  ngOnInit(): void {
    console.log(this.answers);
  }
}
