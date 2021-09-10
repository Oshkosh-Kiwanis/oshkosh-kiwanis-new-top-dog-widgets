import { Component, Prop, h, State } from '@stencil/core';
import { filter } from 'rxjs';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-contest-entries',
})
export class NewTopDogContestLeaderboard {
  /*
  * The contest to show the top dogs from
  */
  @Prop() contest: string;

  @State() totalEntries: number;

  api: NewTopDogApi;

  componentDidLoad() {
    this.api = NewTopDogApi.getInstance();

    this.api.getGoals();
    this.api.goals$.pipe(
      filter(goals => !!goals)
    ).subscribe((goals: any[]) => {
      // find the coresponding contest
      const found = goals.filter((contestGoal: any) => contestGoal?.contest?.page === this.contest)

      if(found && found.length > 0) {
        this.totalEntries = found[0].total_entries;
      }
    })
  }

  render() {
    if(!this.totalEntries) {
        return null;
    }
    return <div class="new-top-dog-contest-entries">
      <span class="num-entries">{ this.totalEntries }</span> Entries
    </div>;
  }

  disconnectedCallback() {
    console.log('component unloaded');
    this.api.close();
  }
}
