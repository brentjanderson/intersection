Brent Anderson's attempt at the intersection problem. After taking a few attempts (including spiking a Phoenix application before deciding that an actor-based approach wouldn't be best after all, see the "elixir" branch), we settled on an event-based system using a central event-emitter to dispatch notifications to all entities in the system. Each entity subscribes to relevant events and filters them based on the role it plays in the simulation.

This was a lot of fun to make and I hope to make minor improvements over time as relevant.

# How to run

1. `yarn`
2. `yarn start`
3. Visit http://localhost:3000

# Features
* [x] Create a traffic signal whose lights change on a timer.
* [-] Model cars arriving at the intersection and traveling through while the light is green.
* [x] Make the left-hand turn lights on opposite sides of the intersection turn green at the same time, letting cars safely turn left. Make sure the "straight" lights are red! You don't want any accidents!
* [ ] Some traffic lights have sensors underneath the road to detect if there are cars waiting. Make your signal smart! For example, if there are no cars waiting, keep that light red. What if cars begin to arrive? How long do you keep the light red?
* [ ] Add support for a "walk" button at each intersection. When the button is pressed, it should cause the intersection to become clear long enough for a person to walk through it.