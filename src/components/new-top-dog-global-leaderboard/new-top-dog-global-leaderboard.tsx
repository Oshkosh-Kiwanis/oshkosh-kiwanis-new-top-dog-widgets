import { Component, h, State } from '@stencil/core';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-global-leaderboard',
  styleUrl: 'new-top-dog-global-leaderboard.scss',
})
export class NewTopDogGlobalLeaderboard {
  @State() dogs: any[];

  api: NewTopDogApi;

  componentDidLoad() {
    console.log('component loaded');
    this.api = NewTopDogApi.getInstance();

    this.api.getGlobalLeaderboard();

    this.api.globalLeaderboard$.subscribe(dogs => {
      // only grab the dogs that are from the specified global
      this.dogs = dogs;

      // sort the dogs in descending order
      this.dogs.sort((a, b) => {
        if(a.votes > b.votes) {
          return -1;
        } else if(a.votes < b.votes ) {
          return 1;
        }

        return 0;
      })
    })
  }

  render() {
    if(!this.dogs) {
      return null;
    }

    return <div class="new-top-dog-global-leaderboard">
      {
        this.dogs?.map(dog => 
          <div class="dog">
            <a href={dog.page} title={"Page for " + dog.dog} style={{ backgroundImage: `url(${dog.picture})`, backgroundSize: "cover", backgroundPosition: "center center" }}>
            </a>
            <div class="info">
              <div class={"contest-" + dog.contest.page}></div>
              <div class="name"><span>{dog.dog}</span></div>
              <div class="votes"><span>{dog.votes} Votes</span></div>
            </div>
            <div class="actions">
              <a class="et_pb_button et_pb_button_2 et_pb_bg_layout_light" href={dog.page} target="_blank">Vote</a>
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
