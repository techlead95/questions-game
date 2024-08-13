Real-time quiz game using React.js and WebSocket

### Screenshots

Connect
![image](https://github.com/user-attachments/assets/4d3015de-030c-4564-a3cf-7ee595a7da19)

List
![image](https://github.com/user-attachments/assets/fef5643e-78fd-477f-9a54-2fcbafa27543)

Ready
![image](https://github.com/user-attachments/assets/63835480-4a3b-4d32-a87b-5b218462e2ae)

Play
![image](https://github.com/user-attachments/assets/ef2a8a1c-2752-4108-89ae-c8f1d38963b2)

Result
![image](https://github.com/user-attachments/assets/6576bb5a-a78d-42bd-bd10-328d1ce30207)

### How to run the project
* Run Docker containers using `docker compose up`.
* Visit `http://localhost/` in your browser.

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
