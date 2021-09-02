import { Component, Prop, h, State } from '@stencil/core';
import { NewTopDogApi } from '../../services/api';

@Component({
  tag: 'new-top-dog-contest-leaderboard',
  styleUrl: 'new-top-dog-contest-leaderboard.scss',
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
      this.dogs = dogs.filter((dog: any) => dog?.contest?.page === this.contest);
    })
  }

  render() {
    if(!this.dogs) {
      return null;
    }

    return <div class="new-top-dog-contest-leaderboard">
      {
        this.dogs?.map(dog => 
          <div class="dog">
            <a href={dog.page} title={"Page for " + dog.dog} style={{ backgroundImage: `url(${dog.picture})`, backgroundSize: "cover", backgroundPosition: "center center" }}>
            </a>
            <div class="info">
              <div class="name"><span>{dog.dog}</span></div>
              <div class="votes"><span>{dog.votes} Votes</span></div>
            </div>
            <div class="actions">
              <a class="et_pb_button et_pb_button_2 et_pb_bg_layout_light" href={dog.page} target="_blank">Vote For {dog.dog}</a>
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
