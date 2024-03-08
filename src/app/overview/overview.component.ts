import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { XLCategories, Question } from '../model/data';
import { linus_party_data } from '../data/linus-party';
import { groups } from '../data/groups';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  private json_data = linus_party_data;
  public categories: XLCategories = this.json_data;
  public groups = groups;
  public currentGroupIndex = 0;

  constructor(private router: Router, private groupService: GroupService) {}

  ngOnInit() {
    this.json_data.categories.forEach((categories) =>
      categories.questions.forEach((question) => {
        question.answered = !!localStorage.getItem(question.id.toString());
      })
    );
    this.groupService.currentGroupIndex.subscribe((index) => {
      this.currentGroupIndex = index;
    });
    this.groups = this.groupService.getGroups();
    console.log(this.json_data)
  }

  navigateToDetails(quest: Question) {
    const param = quest.id;
    this.router.navigate(['/details'], {
      queryParams: { param, groupIndex: this.currentGroupIndex },
    });
  }

  nextGroupTurn() {
    this.currentGroupIndex = (this.currentGroupIndex + 1) % this.groups.length;
  }

}
