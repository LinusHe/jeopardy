import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Categories, FinatixCategories, Question} from "../model/data";
import {finatix_christmas_data} from "../data/finatix-christmas";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  private json_data = finatix_christmas_data;
  public categories: FinatixCategories = this.json_data;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.json_data.categories.forEach(categories => categories.questions.forEach(question => {
      question.answered = !!localStorage.getItem(question.id.toString());
    }))
  }

  navigateToDetails(quest: Question) {
    const param = quest.id;
    this.router.navigate(['/details'], {queryParams: {param}})
  }
}
