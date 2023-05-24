## Harbour
Harbour is a cross-platform chat application built by me and three other students for our senior project at Rowan University.

### How it was built

The frontend for the application was built using Flutter, a cross-platform, widget-based material design framework. Flutter apps are written using Dart, which is a language somewhat similar to JavaScript. The frontend uses RESTful APIs to communicate with the backend, which is written in Go using a framework called Echo. The backend is connected to a PostgreSQL database. We used Atlas to handle our database migrations and containerized the backend using Docker to make it easy to synchronize the schema between development environments.

### My contributions

I was primarily responsible for working on the frontend. I designed the original mockups as well as the UI. I also set up client-side storage so session tokens could be saved locally on the user's machine. On the backend side, I implemented password hashing and salting.

### Project status

As of right now, the project is functional but far from finished. We wanted to rewrite the chat interface using websockets, but ended up running out of time. We also never actually deployed the application anywhere.