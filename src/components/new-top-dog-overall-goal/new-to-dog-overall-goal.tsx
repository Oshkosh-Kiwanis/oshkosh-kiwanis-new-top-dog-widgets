import { Component, Prop, h, State } from '@stencil/core';
import { filter } from 'rxjs';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-overall-goal',
})
export class NewTopDogContestLeaderboard {
  /*
  * The contest to show the top dogs from
  */
  @Prop() contest: string;
  @Prop() mode: 'raised' | 'bar' = 'raised'

  @State() raised: number;
  @State() matchDay: number;
  @State() goal: number;

  api: NewTopDogApi;

  componentDidLoad() {
    console.log('component loaded');
    this.api = NewTopDogApi.getInstance();

    this.api.getGoals();

      this.api.goals$.pipe(
      filter(goals => !!goals)
    ).subscribe((goals: any[]) => {
      this.raised = goals.reduce((r, a) => r + a?.raised || 0, 0).toFixed(2);
      this.matchDay = goals.reduce((r, a) => r + a?.match_day || 0, 0).toFixed(2);
      this.goal = goals.reduce((r, a) => r + a?.goal || 0, 0).toFixed(2);
    })
  }

  render() {
    if(!this.raised || !this.goal) {
        return null;
    }

    if(this.mode === 'bar') {
        return <div class="new-top-dog-overall-goal">
            <div class="goals-text">
                <div>
                    <div class="raised">${ this.raised }</div>
                    { !!this.matchDay ? <div class="match-day">+ ${ this.matchDay }</div> : null }
                </div> 
                <div class="raised">${ this.goal }</div>
            </div>
            <div class="goals-bar">
                <div class="goals-bar-raised" style={{ width: `${this.raised / this.goal * 100}%` }}></div>
            </div>
        </div>;
    }

    if(this.mode === 'raised') {
        return <div class="new-top-dog-overall-goal">
            ${ this.raised }
        </div>;
    }
  }

  disconnectedCallback() {
    console.log('component unloaded');
    this.api.close();
  }
}
