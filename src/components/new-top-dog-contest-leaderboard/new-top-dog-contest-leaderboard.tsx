import { Component, Prop, h, State } from '@stencil/core';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-contest-leaderboard',
})
export class NewTopDogContestLeaderboard {
  /*
  * The contest to show the top dogs from
  */
  @Prop() contest: string;

  @State() dogs: any[];

  api: NewTopDogApi;

  componentDidLoad() {
    console.log('component loaded');
    this.api = NewTopDogApi.getInstance();

    this.api.getDogs();

    this.api.dogs$.subscribe(dogs => {
      this.dogs = dogs.filter(dog => dog.contest.page === this.contest);

      console.log(this.dogs);
    })
  }

  render() {
    return <div class="new-top-dog-contest-leaderboard">
      {
        this.dogs?.map(dog => 
          <div class="dog">
            <a href={dog.page} title={"Page for " + dog.dog} style={{ backgroundImage: `url(${dog.picture})`, backgroundSize: "cover", backgroundPosition: "center center" }}>
            </a>
            <div class="info">
              <div class="name">{dog.dog}</div>
              <div class="votes">{dog.votes}</div>
            </div>
          </div>
        )
      }
    </div>;
  }

  disconnectedCallback() {
    console.log('component unloaded');
    this.api.close();
  }
}
