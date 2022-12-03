import {Component, OnInit} from '@angular/core';
import {Categories, data, Question} from "../data/data";
import {Router} from "@angular/router";


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public categories: Categories = data;

  constructor(private router: Router) {
  }

  ngOnInit() {
    data.categories.forEach(categories => categories.questions.forEach(question => {
      question.answered = !!localStorage.getItem(question.id.toString());
    }))
  }

  navigateToDetails(quest: Question) {
    const param = quest.id;
    this.router.navigate(['/details'], {queryParams: {param}})
  }
}
