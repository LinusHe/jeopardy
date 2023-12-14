import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../model/data";
import {finatix_christmas_data} from "../data/finatix-christmas";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  private json_data = finatix_christmas_data;
  public questionId: number;
  public category: string | undefined;
  public question: Question | undefined;
  public answered: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {
    this.questionId = parseInt(activatedRoute.snapshot.queryParams['param']);
    this.findQuestionById();
  }

  private findQuestionById() {
    this.json_data.categories
      .find((categories) => {
        this.category = categories.category;
        return this.question = categories.questions.find(ques => this.questionId === ques.id)
      });
  }

  displayAnswer() {
    this.answered = true;

    setTimeout(() => {
      localStorage.setItem(this.questionId.toString(), 'true');
      this.router.navigate(['overview']);
    }, 3000);
  }
}
