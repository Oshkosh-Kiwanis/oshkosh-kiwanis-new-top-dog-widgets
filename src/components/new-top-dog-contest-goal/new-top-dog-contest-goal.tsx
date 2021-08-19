import { Component, Prop, h, State } from '@stencil/core';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-contest-goal',
})
export class NewTopDogContestGoal {
  /*
  * The contest to show the top dogs from
  */
  @Prop() contest: string;

  @State() contestGoal: any;

  api: NewTopDogApi;

  componentDidLoad() {
    console.log('component loaded');
    this.api = NewTopDogApi.getInstance();

    this.api.getContests();

    this.api.contests$.subscribe(contestGoals => {
      console.log(contestGoals);
      this.contestGoal = contestGoals.filter(contestGoal => contestGoal.contest.page === this.contest)[0];
      console.log(this.contestGoal);
    })
  }

  render() {
    if(!this.contestGoal) {
        return null;
    }

    return <div class="new-top-dog-contest-goal">
        <div class="goals-text">
            <div>
                <div class="raised">${ this.contestGoal.raised.toFixed(2) }</div>
                { !!this.contestGoal.matchDay ? <div class="match-day">+ ${ this.contestGoal.match_day.toFixed(2) }</div> : null }
            </div> 
            <div class="raised">${ this.contestGoal.goal.toFixed(2) }</div>
        </div>
        <div class="goals-bar">
            <div class="goals-bar-raised" style={{ width: `${this.contestGoal.raised / this.contestGoal.goal * 100}%` }}></div>
        </div>
    </div>;
  }

  disconnectedCallback() {
    console.log('component unloaded');
    this.api.close();
  }
}