import { Component, OnInit } from '@angular/core';
import { User } from '@money-sprouts/shared/domain';
import { Observable, map, take } from 'rxjs';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'money-sprouts-balance-overview',
  templateUrl: './balance-overview.component.html',
  styleUrls: ['./balance-overview.component.scss'],
})
export class BalanceOverviewComponent implements OnInit {
  user$: Observable<User | null>;
  nextPayday$: Observable<Date | null>;

  constructor(
    private userService: UserService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.user$ = this.userService.currentUser$;
  
    this.nextPayday$ = this.user$.pipe(take(1),
      map(user => {
        console.log('next payday of this user: ', user?.nextPayday)
        return user ? user.nextPayday : null
      })
    );
  
    this.user$.pipe(take(1)).subscribe(
      user => console.log('Emitted user:', user),
      error => console.error('Error in user$:', error)
    );
  
    this.nextPayday$.pipe(take(1)).subscribe(
      date => console.log('Emitted next payday:', date),
      error => console.error('Error in nextPayday$:', error)
    );
  }

  getFunnyImage(balance: number | undefined): string {
    switch (true) {
      case balance <= 0:
        return './assets/images/3d-empty-box.png';
      case balance < 500:
        return './assets/images/3d-dog-from-behind.png'; 
      case balance < 1000:
        return './assets/images/3d-sitting-dog.png'; 
      case balance < 1500:
        return './assets/images/3d-dog-with-leash.png';
      case balance < 2000:
        return './assets/images/3d-dog-with-bag.png';
      case balance < 5000:
        return './assets/images/3d-man-playing-with-dog.png';
      default:
        return './assets/images/3d-dog-and-boy-jumping.png';
    }
  }

  getFormatedNextPayday(nextPayday: Date): string {
    const formattedDate = this.datePipe.transform(nextPayday, 'dd. MMMM yyyy', undefined, 'en');
    const dayName = this.datePipe.transform(nextPayday, 'EEEE', undefined, 'en');
    return `${dayName} (${formattedDate})`;
  }

  getDaysUntilNextPayday(nextPayday: Date): string {
    const dayDifference = this.calculateDaysUntilNextPayday(nextPayday);
    return `${dayDifference}`;
  }
  
  private calculateDaysUntilNextPayday(nextPayday: Date): number {
    if (!nextPayday) {
      console.log('nextPayday is: ', nextPayday);
      return 0;
    }

    const nowString = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    const nextPaydayString = this.datePipe.transform(nextPayday, 'yyyy-MM-dd');

    // Convert the strings back to Date objects
    const now = new Date(nowString);
    const nextPaydayDate = new Date(nextPaydayString);

    const diffMilliseconds = nextPaydayDate.getTime() - now.getTime();

    const diffDays = Math.round(diffMilliseconds / (24 * 60 * 60 * 1000));

    return diffDays;
}
  
}