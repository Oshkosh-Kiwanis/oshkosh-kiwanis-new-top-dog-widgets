import { Observable, of, Subject, timer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { catchError, concatMapTo, switchMap } from 'rxjs/operators';

export class NewTopDogApi {
  private static num_instances = 0;
  private static instance: NewTopDogApi;
  socket: WebSocket = null;

  goals$: Observable<any> = null;
  dogs$: Observable<any> = null;

  destroy$ = new Subject<boolean>();

  private constructor() {}

  static getInstance() {
    if (!NewTopDogApi.instance) {
      NewTopDogApi.instance = new NewTopDogApi();
    }
    NewTopDogApi.num_instances += 1;

    return NewTopDogApi.instance;
  }

  public getDogs() {
    if(!this.dogs$){
      this.dogs$ = timer(0, 60 * 1000).pipe(
        concatMapTo(
          fromFetch("https://new-top-dog-gateway-cwp94ia4.uc.gateway.dev/v1/contests/dogs").pipe(
            switchMap(response => {
              if (response.ok) {
                // OK return data
                return response.json();
              } else {
                // Server is returning a status requiring the client to try something else.
                return of({ error: true, message: `Error ${response.status}` });
              }
            }),
            catchError(err => {
              // Network or other error, handle appropriately
              console.error(err);
              return of({ error: true, message: err.message })
            })
          )
        ),
      )
    }
  }

  public getGoals() {
    if(!this.goals$){
      this.goals$ = timer(0, 60 * 1000).pipe(
        concatMapTo(
          fromFetch("https://new-top-dog-gateway-cwp94ia4.uc.gateway.dev/v1/contests/goals").pipe(
            switchMap(response => {
              if (response.ok) {
                // OK return data
                return response.json();
              } else {
                // Server is returning a status requiring the client to try something else.
                return of({ error: true, message: `Error ${response.status}` });
              }
            }),
            catchError(err => {
              // Network or other error, handle appropriately
              console.error(err);
              return of({ error: true, message: err.message })
            })
          )
        ),
      )
    }
  }

  public close() {
    NewTopDogApi.num_instances -= 1;

    if (NewTopDogApi.num_instances <= 0) {
      this.destroy$.next(true);
      this.destroy$.complete();
    }
  }
}
