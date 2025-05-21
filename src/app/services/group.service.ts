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

  updateMemberName(groupIndex: number, memberIndex: number, newName: string) {
    if (this.groups[groupIndex] && this.groups[groupIndex].members[memberIndex] !== undefined) {
      this.groups[groupIndex].members[memberIndex] = newName;
      this.saveGroups();
    }
  }

  addMember(groupIndex: number, memberName: string) {
    if (this.groups[groupIndex]) {
      this.groups[groupIndex].members.push(memberName);
      this.saveGroups();
    }
  }

  deleteMember(groupIndex: number, memberIndex: number) {
    if (this.groups[groupIndex] && this.groups[groupIndex].members[memberIndex] !== undefined) {
      this.groups[groupIndex].members.splice(memberIndex, 1);
      this.saveGroups();
    }
  }

  moveMember(
    previousGroupIndex: number,
    currentGroupIndex: number,
    previousMemberIndex: number,
    currentMemberIndex: number,
    memberName: string
  ) {
    if (
      this.groups[previousGroupIndex] &&
      this.groups[currentGroupIndex]
    ) {
      // Remove from previous group
      this.groups[previousGroupIndex].members.splice(previousMemberIndex, 1);
      // Add to new group at the specified position
      this.groups[currentGroupIndex].members.splice(currentMemberIndex, 0, memberName);
      this.saveGroups();
    }
  }
}