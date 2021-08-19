import { ReplaySubject, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export class NewTopDogApi {
    private static num_instances = 0;
    private static instance: NewTopDogApi;
    socket: WebSocket = null;

    contests$ = new Subject<any>();
    dogs$ = new Subject<any>();

    destroy$ = new Subject<boolean>();
    messages$ = new ReplaySubject<string>(100);

    private constructor() {
        // connect to the websocket api
        // this.socket = new WebSocket("ws://api.new-top-dog.timios.dev/ws/");
        this.socket = new WebSocket("ws://35.223.188.100/ws/");


        this.socket.onopen = (_e) => {
            // subscribe to the message subjects
            this.messages$.pipe(takeUntil(this.destroy$)).subscribe(message => {
                this.socket.send(message);
            })
        };

        this.socket.onmessage = (event) => {
            try {
                const resp = JSON.parse(event.data);

                switch(resp.response_type) {
                    case "top-dogs":
                        this.dogs$.next(resp.data);
                        break;
                    case "contest-goals":
                        this.contests$.next(resp.data);
                        break;
                }
            } catch(e) {
                console.error('Unable to parse message from server', e);
            }
        };

        this.socket.onclose = function(event) {
            if (!event.wasClean) {
                // e.g. server process killed or network down
                // event.code is usually 1006 in this case
                console.error('[close] Connection died');
            }
        };

        this.socket.onerror = function(error) {
            console.error(error);
        };
    }

    static getInstance(){ 
        if(!NewTopDogApi.instance) {
            NewTopDogApi.instance = new NewTopDogApi();
        }
        NewTopDogApi.num_instances += 1;

        return NewTopDogApi.instance;
    }

    public getDogs() {
        timer(0, 60 * 1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.messages$.next("dogs");
        })
    }

    public getContests() {
        timer(0, 60 * 1000).pipe(takeUntil(this.destroy$)).subscribe(() => {
            this.messages$.next("contests");
        })
    }

    public close() { 
        NewTopDogApi.num_instances -= 1;

        if(NewTopDogApi.num_instances <= 0) {
            this.destroy$.next(true);
            this.destroy$.complete();
            this.socket.close();
        }
    }
}