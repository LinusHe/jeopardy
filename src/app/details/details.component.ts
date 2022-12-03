import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {data, Question} from "../data/data";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  public questionId: number;
  public question: Question | undefined;
  public answer: string = '';

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.questionId = parseInt(activatedRoute.snapshot.queryParams['param']);
    this.findQuestionById();
  }

  private findQuestionById() {
    this.question = data.categories.map(categories => {
      return categories.questions.find(ques => this.questionId === ques.id)
    }).find(obj => obj);
  }

  displayAnswer() {
    this.answer = this.question?.answer ?? 'no answer found';

    setTimeout(() => {
      localStorage.setItem(this.questionId.toString(), 'true');
      this.router.navigate(['overview']);
    }, 3000);
  }
}
