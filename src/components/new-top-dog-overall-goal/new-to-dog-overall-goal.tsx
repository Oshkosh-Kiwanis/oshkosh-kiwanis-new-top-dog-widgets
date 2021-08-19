import { Component, Prop, h, State } from '@stencil/core';
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

    this.api.getContests();

    this.api.dogs$.subscribe((dogs: any[]) => {
      this.raised = dogs.reduce((a, b) => a.raised + b.raised).toFixed(2);
      this.matchDay = dogs.reduce((a, b) => a.match_day + b.match_day).toFixed(2);
      this.goal = dogs.reduce((a, b) => a.goal + b.goal).toFixed(2);
    })
  }

  render() {
    if(!this.raised || this.goal) {
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
