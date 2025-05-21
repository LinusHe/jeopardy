import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { Group } from '../model/data';
import confetti from 'canvas-confetti';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit, OnDestroy {
  groups: Group[] = [];
  gameOver: boolean = false;
  private confettiInterval: any;

  constructor(private groupService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.groups = this.groupService.getGroups();
    if (localStorage.getItem('gameOver') === 'true') {
      this.gameOver = true;
      this.highlightWinnerGroup();
      this.showRepeatingConfetti();
      localStorage.removeItem('gameOver');
    }
  }

  startGame(): void {
    this.router.navigate(['/overview']);
  }

  updateGroupName(index: number, groupName: string): void {
    this.groupService.updateGroupName(index, groupName);
  }

  addPoints(index: number, points: number): void {
    this.groupService.updateGroupPoints(index, points);
  }

  subtractPoints(index: number, points: number): void {
    this.groupService.updateGroupPoints(index, -points);
  }

  updateMemberName(groupIndex: number, memberIndex: number, newName: string): void {
    this.groupService.updateMemberName(groupIndex, memberIndex, newName);
  }

  addMember(groupIndex: number, memberName: string): void {
    if (memberName && memberName.trim() !== '') {
      this.groupService.addMember(groupIndex, memberName.trim());
    }
  }

  deleteMember(groupIndex: number, memberIndex: number): void {
    this.groupService.deleteMember(groupIndex, memberIndex);
  }

  drop(event: CdkDragDrop<string[]>, groupIndex: number): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // Persist changes if items are reordered within the same group
      this.groupService.saveGroups();
    } else {
      // const previousGroupIndex = this.groups.findIndex(group => group.members === event.previousContainer.data);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // The component's 'this.groups' array (which is a reference to the service's internal array)
      // has been updated by transferArrayItem. Now, just save the state.
      this.groupService.saveGroups();
    }
  }

  highlightWinnerGroup(): void {
    const highestPoints = Math.max(...this.groups.map((group) => group.points));
    this.groups.forEach((group) => {
      group.isWinner = group.points === highestPoints;
    });
  }

  showRepeatingConfetti(): void {
    const duration = 30 * 1000 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number): number {
      return Math.random() * (max - min) + min;
    }

    this.confettiInterval = setInterval((): void => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(this.confettiInterval);
      }

      const particleCount = 50;
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  }

  ngOnDestroy(): void {
    if (this.confettiInterval) {
      clearInterval(this.confettiInterval);
    }
  }
}
