import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {finatixler_data} from "../data/data-wilde-finatixler";
import {Categories, Question} from "../model/data";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  private json_data = finatixler_data;
  public categories: Categories = this.json_data;

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
