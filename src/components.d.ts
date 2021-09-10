/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface NewTopDogContestEntries {
        "contest": string;
    }
    interface NewTopDogContestGoal {
        "contest": string;
    }
    interface NewTopDogContestLeaderboard {
        "contest": string;
    }
    interface NewTopDogOverallGoal {
        "contest": string;
        "mode": 'raised' | 'bar';
    }
}
declare global {
    interface HTMLNewTopDogContestEntriesElement extends Components.NewTopDogContestEntries, HTMLStencilElement {
    }
    var HTMLNewTopDogContestEntriesElement: {
        prototype: HTMLNewTopDogContestEntriesElement;
        new (): HTMLNewTopDogContestEntriesElement;
    };
    interface HTMLNewTopDogContestGoalElement extends Components.NewTopDogContestGoal, HTMLStencilElement {
    }
    var HTMLNewTopDogContestGoalElement: {
        prototype: HTMLNewTopDogContestGoalElement;
        new (): HTMLNewTopDogContestGoalElement;
    };
    interface HTMLNewTopDogContestLeaderboardElement extends Components.NewTopDogContestLeaderboard, HTMLStencilElement {
    }
    var HTMLNewTopDogContestLeaderboardElement: {
        prototype: HTMLNewTopDogContestLeaderboardElement;
        new (): HTMLNewTopDogContestLeaderboardElement;
    };
    interface HTMLNewTopDogOverallGoalElement extends Components.NewTopDogOverallGoal, HTMLStencilElement {
    }
    var HTMLNewTopDogOverallGoalElement: {
        prototype: HTMLNewTopDogOverallGoalElement;
        new (): HTMLNewTopDogOverallGoalElement;
    };
    interface HTMLElementTagNameMap {
        "new-top-dog-contest-entries": HTMLNewTopDogContestEntriesElement;
        "new-top-dog-contest-goal": HTMLNewTopDogContestGoalElement;
        "new-top-dog-contest-leaderboard": HTMLNewTopDogContestLeaderboardElement;
        "new-top-dog-overall-goal": HTMLNewTopDogOverallGoalElement;
    }
}
declare namespace LocalJSX {
    interface NewTopDogContestEntries {
        "contest"?: string;
    }
    interface NewTopDogContestGoal {
        "contest"?: string;
    }
    interface NewTopDogContestLeaderboard {
        "contest"?: string;
    }
    interface NewTopDogOverallGoal {
        "contest"?: string;
        "mode"?: 'raised' | 'bar';
    }
    interface IntrinsicElements {
        "new-top-dog-contest-entries": NewTopDogContestEntries;
        "new-top-dog-contest-goal": NewTopDogContestGoal;
        "new-top-dog-contest-leaderboard": NewTopDogContestLeaderboard;
        "new-top-dog-overall-goal": NewTopDogOverallGoal;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "new-top-dog-contest-entries": LocalJSX.NewTopDogContestEntries & JSXBase.HTMLAttributes<HTMLNewTopDogContestEntriesElement>;
            "new-top-dog-contest-goal": LocalJSX.NewTopDogContestGoal & JSXBase.HTMLAttributes<HTMLNewTopDogContestGoalElement>;
            "new-top-dog-contest-leaderboard": LocalJSX.NewTopDogContestLeaderboard & JSXBase.HTMLAttributes<HTMLNewTopDogContestLeaderboardElement>;
            "new-top-dog-overall-goal": LocalJSX.NewTopDogOverallGoal & JSXBase.HTMLAttributes<HTMLNewTopDogOverallGoalElement>;
        }
    }
}
