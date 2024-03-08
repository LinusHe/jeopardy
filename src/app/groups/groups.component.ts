import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GroupService } from '../services/group.service';
import { Group } from '../model/data';
import confetti from 'canvas-confetti';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  groups: Group[] = [];
  gameOver: boolean = false;

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

    const interval = setInterval(function(): void {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50;
      confetti(Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  }
}
