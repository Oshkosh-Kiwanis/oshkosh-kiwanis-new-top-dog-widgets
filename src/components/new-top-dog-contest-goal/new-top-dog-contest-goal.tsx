import { Component, Prop, h, State } from '@stencil/core';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-contest-goal',
  styleUrl: 'new-top-dog-contest-goal.scss',
})
export class NewTopDogContestGoal {
  /*
  * The contest to show the top dogs from
  */
  @Prop() contest: string;

  @State() raised: number;
  @State() match_day: number;
  @State() contestGoal: any;
  @State() votesBarWidth: number;
  @State() matchDayBarWidth: number;

  api: NewTopDogApi;
  formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  format(cur: number) {
    const curStr = this.formatter.format(cur);

    // chop off the currency from the number!
    return curStr.substr(0, curStr.length - 3);
  }

  componentDidLoad() {
    console.log('component loaded');
    this.api = NewTopDogApi.getInstance();

    this.api.getGoals();

    this.api.goals$.subscribe(contestGoals => {
      const found = contestGoals.filter((contestGoal: any) => contestGoal?.contest?.page === this.contest)

      if(found && found.length > 0){
        this.contestGoal = found[0];

        this.raised = this.contestGoal.raised + this.contestGoal.champ_day || 0;
        this.match_day = this.contestGoal.match_day || 0;
        const total = this.raised + this.match_day || 0 ;
        const max = Math.max(total, this.contestGoal.goal);

        this.votesBarWidth = this.raised / max * 100;
        this.matchDayBarWidth = this.match_day / max * 100;
      }
    })
  }

  render() {
    if(!this.contestGoal) {
        return null;
    }

    return <div class="new-top-dog-contest-goal">
        <div class="goals-text">
            <div class="raised">
                { !!this.contestGoal.match_day ? <div class="match-day">{ this.format(this.match_day) }&nbsp;+&nbsp;</div> : null }
                <div class="votes">{ this.format(this.raised) }</div>
            </div>
            <div class="goal">{ this.format(this.contestGoal.goal) }</div>
        </div>
        <div class="goals-bar">
            <div class="goals-bar-raised-match-day" style={{ width: `${this.matchDayBarWidth}%` }}></div>
            <div class="goals-bar-raised-votes" style={{ width: `${this.votesBarWidth}%` }}></div>
        </div>
    </div>;
  }

  disconnectedCallback() {
    console.log('component unloaded');
    this.api.close();
  }
}
