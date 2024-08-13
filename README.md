### How to run the project
* Run docker containers using `docker compose up`.
* Visit `http://localhost/` in the browser.

### Libraries
* UI library: Shadcn for accessibility, customizability and Tailwind compatibility.
* State management: Zustand for simplicity, optimal performance, and [transient updates](https://github.com/pmndrs/zustand?tab=readme-ov-file#transient-updates-for-often-occurring-state-changes).
* Form validation: Zod for seamless TypeScript integration

### Decisions
* Modeled events and commands with union types to ensure type safety.
* Implemented event subscription with a transient update to prevent re-rendering components on new events. For instance, in `GameReadyPage`, it navigates to `GamePlayPage` upon receiving `game_start` without rerendering `GameReadyPage` whenver new event is received.
* Managed state of active game in the store, as it needs to be shared between different pages.
* Managed state of the games list in the store, as it needs to be updated whenever a new event is received, even if `GameListPage` is not rendered.
* Managed states of question and answer locally in `GamePlayPage` as they are temporary states that don't need to be shared or persisted.