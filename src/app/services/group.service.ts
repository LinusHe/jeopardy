import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Group } from '../model/data';
import { groups as initialGroups } from '../data/groups';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private groupIndexSource = new BehaviorSubject<number>(0);
  currentGroupIndex = this.groupIndexSource.asObservable();
  private groups: Group[] = [];

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const savedGroups = localStorage.getItem('groups');
    const savedIndex = localStorage.getItem('currentGroupIndex');
    if (savedGroups) {
      this.groups = JSON.parse(savedGroups);
    } else {
      this.groups = initialGroups; // Use initialGroups if none are found in localStorage
    }
    if (savedIndex) {
      this.groupIndexSource.next(parseInt(savedIndex, 10));
    }
  }

  getGroups(): Group[] {
    return this.groups;
  }

  updateGroupName(groupIndex: number, groupName: string) {
    if (this.groups[groupIndex]) {
      this.groups[groupIndex].groupName = groupName;
      this.saveGroups();
    }
  }

  updateGroupPoints(groupIndex: number, points: number) {
    if (this.groups[groupIndex]) {
      this.groups[groupIndex].points += points;
      this.saveGroups();
    }
  }

  nextGroupTurn(totalGroups: number) {
    const nextIndex = (this.groupIndexSource.value + 1) % totalGroups;
    this.groupIndexSource.next(nextIndex);
    localStorage.setItem('currentGroupIndex', nextIndex.toString());
  }

  saveGroups() {
    localStorage.setItem('groups', JSON.stringify(this.groups));
  }
}