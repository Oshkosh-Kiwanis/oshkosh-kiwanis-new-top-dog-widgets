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
  @Prop() mode: 'number' | 'bar' = 'bar';

  @State() contestGoal: any;

  @State() raised: number;
  @State() champ_day: number;
  @State() votesBarWidth: number;
  @State() champDayBarWidth: number;

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

        this.raised = this.contestGoal.raised;
        // this.champ_day = this.contestGoal.champ_day || 0;
        this.champ_day = 5000;
        const total = this.raised + this.champ_day || 0 ;
        const max = Math.max(total, this.contestGoal.goal);

        this.votesBarWidth = this.raised / max * 100;
        this.champDayBarWidth = this.champ_day / max * 100;
      }
    })
  }

  render() {
    if(!this.contestGoal) {
        return null;
    }

    if(this.mode === 'number') {
      return <div class="new-top-dog-contest-goal">
          <div class="goals-numbers">
              <div class="raised">
                  <span class="votes">{ this.format(this.raised) }</span>
                  { !!this.champ_day ? <span class="champ-day">&nbsp;+&nbsp;{ this.format(this.champ_day) }</span> : null }
              </div>
          </div>
      </div>;
    }

    if(this.mode === 'bar') { 
      return <div class="new-top-dog-contest-goal">
          <div class="goals-text">
              <div class="raised">
                  <div class="votes">{ this.format(this.raised) }</div>
                  { !!this.champ_day ? <div class="champ-day">&nbsp;+&nbsp;{ this.format(this.champ_day) }</div> : null }
              </div>
              <div class="goal">{ this.format(this.contestGoal.goal) }</div>
          </div>
          <div class="goals-bar">
              <div class="goals-bar-raised-votes" style={{ width: `${this.votesBarWidth}%` }}></div>
              <div class="goals-bar-raised-champ-day" style={{ width: `${this.champDayBarWidth}%` }}></div>
          </div>
      </div>;
    }
  }

  disconnectedCallback() {
    console.log('component unloaded');
    this.api.close();
  }
}
