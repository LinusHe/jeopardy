import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Question, Group } from '../model/data';
import { linus_party_data } from '../data/linus-party';
import { groups } from '../data/groups';
import { GroupService } from '../services/group.service';
import confetti from 'canvas-confetti';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  private jsonData = linus_party_data;
  public questionId: number;
  public isEstimationQuestion: boolean = false;
  public category: string | undefined;
  public question: Question | undefined;
  public answered = false;
  public correctAnswer = false;
  public pointsAwarded = false;
  public pointsMessage = '';
  public group: Group | undefined;
  public allGroups = groups;
  public groupIndex: number;
  public selectedGroupIndex?: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private groupService: GroupService
  ) {
    this.questionId = parseInt(activatedRoute.snapshot.queryParams['param']);
    this.groupIndex = parseInt(
      activatedRoute.snapshot.queryParams['groupIndex']
    ); // Get groupIndex from queryParams
    if (isNaN(this.groupIndex)) {
      console.error('Invalid groupIndex');
      this.groupIndex = 0; // Example fallback
    }
    this.allGroups = this.groupService.getGroups();
    this.group = this.allGroups[this.groupIndex]; // Set the current group based on groupIndex
    this.findQuestionById();
  }

  findQuestionById() {
    for (const category of this.jsonData.categories) {
      this.category = category.category;
      const question = category.questions.find(
        (ques) => this.questionId === ques.id
      );
      if (question) {
        this.question = question;
        this.isEstimationQuestion = question.isEstimationQuestion || false;
        break;
      }
    }
  }

  displayAnswer() {
    this.answered = true;
  }

  selectGroup(index: number): void {
    this.selectedGroupIndex =
      this.selectedGroupIndex === index ? undefined : index;
    console.log(
      'selectedGroupIndex',
      this.selectedGroupIndex,
      'groupIndex',
      this.groupIndex
    );
  }

  updatePoints(correct: boolean, selectedGroupIndex?: number) {
    const targetGroupIndex = selectedGroupIndex ?? this.groupIndex;
    let pointsToAdd = parseInt(this.question?.amount ?? '0');
    console.log("Correct", correct, "pointsToAdd", pointsToAdd, "selectedGroupIndex", selectedGroupIndex)
    if (!correct && selectedGroupIndex !== undefined) {
      pointsToAdd = -pointsToAdd;
    }
    else if (!correct && selectedGroupIndex === undefined) {
      pointsToAdd = 0;
    }
    this.handlePointsAndNavigation(pointsToAdd, targetGroupIndex, correct);
  }

  markAnswer(correct: boolean) {
    this.updatePoints(correct, this.selectedGroupIndex);
    this.selectedGroupIndex = undefined; // Reset the selected group index
  }

  awardPointsToGroup(groupIndex: number) {
    this.updatePoints(true, groupIndex);
  }

  handlePointsAndNavigation(
    pointsToAdd: number,
    groupIndex: number,
    correct: boolean
  ): void {
    this.groupService.updateGroupPoints(groupIndex, pointsToAdd);
    this.setPointsMessage(pointsToAdd, groupIndex, correct);
    this.correctAnswer = correct;
    this.pointsAwarded = true;
    this.showConfetti(correct);
    this.navigateAfterAction();
  }

  setPointsMessage(pointsToAdd: number, groupIndex: number, correct: boolean) {
    if (pointsToAdd < 0) {
      this.pointsMessage = `Leider ${Math.abs(
        pointsToAdd
      )} Punkte abgezogen von ${this.allGroups[groupIndex].groupName}.`;
    } else {
      this.pointsMessage = correct
        ? `${pointsToAdd} Punkte für ${this.allGroups[groupIndex].groupName}!`
        : `Schade, keine Punkte für ${this.allGroups[groupIndex].groupName}.`;
    }
  }

  navigateAfterAction() {
    this.groupService.nextGroupTurn(this.allGroups.length);
    localStorage.setItem(this.questionId.toString(), 'true');
    if (this.checkIfGameOver()) {
      setTimeout(() => {
        localStorage.setItem('gameOver', 'true');
        this.router.navigate(['/groups']);
      }, 3000);
    } else {
      setTimeout(() => {
        this.router.navigate(['overview']);
      }, 3000);
    }
  }

  showConfetti(correct: boolean) {
    var scalar = 4;
    var sad = confetti.shapeFromText({ text: '😢', scalar });
    var wrong = confetti.shapeFromText({ text: '❌', scalar });
    var thumbsDown = confetti.shapeFromText({ text: '👎', scalar });

    if (correct) {
      confetti({
        particleCount: 350,
        spread: 350,
        origin: { y: 0.4 },
      });
    } else {
      confetti({
        particleCount: 50,
        spread: 150,
        origin: { y: 0.4 },
        shapes: [wrong],
        scalar,
      });
    }
  }

  updateGroupTurnAndNavigate() {
    this.groupService.nextGroupTurn(this.allGroups.length);
    localStorage.setItem(this.questionId.toString(), 'true');
    console.log(this.checkIfGameOver());
    if (this.checkIfGameOver()) {
      setTimeout(() => {
        localStorage.setItem('gameOver', 'true'); // Set a flag indicating the game is over
        this.router.navigate(['/groups']); // Navigate to the groups component
      }, 3000);
    } else {
      setTimeout(() => {
        this.router.navigate(['overview']); // Navigate to the overview component if the game is not over
      }, 3000);
    }
  }

  checkIfGameOver(): boolean {
    return this.jsonData.categories.every((category) =>
      category.questions.every(
        (question) =>
          question.answered ||
          localStorage.getItem(question.id.toString()) === 'true'
      )
    );
  }

  navigateToGroups() {
    localStorage.setItem('gameOver', 'true');
    this.router.navigate(['/groups']);
  }
}
