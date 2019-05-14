# README

## The basics
1) Visit https://flashcards-study-app.herokuapp.com.
2) Sign in with email `user@example.com` and password `password`
OR sign up with a different email and password.
3) New flashcards can be created by clicking the big 'new flashcard' button. Existing flashcards can be flipped, edited, or destroyed.

## The fun part
The creative feature I've included for this assignment is a rudimentary implementation of the 'spaced repetition' approach to learning with flashcards. I make use of the still-evolving [Wep Push APIs](https://developer.mozilla.org/en-US/docs/Web/API/Push_API/Best_Practices), the job-scheduling framework, [Sidekiq](https://github.com/mperham/sidekiq), and Heroku's [Redis add-on](https://devcenter.heroku.com/articles/heroku-redis) to periodically, at random intervals hardcoded to be between 10 and 90 seconds, prod users to revisit the site. I was going for something like the [Leitner system](https://en.wikipedia.org/wiki/Leitner_system) and wanted to incorporate little quizzes each time a user returned for their flashcards, but simply getting push notifications to work at all with my React-Rails setup proved to be pretty time-consuming. I wrote up a little summary of a quirk I discovered about the Notifications API [here](https://github.com/GoogleChromeLabs/web-push-codelab/issues/41#issuecomment-491661395).

In any case, hit the big green button at the top left corner of the page ('Turn Push Notifications ON') to fire up the notifications machine! Realistically, I envision a setup where the time intervals are configurable by the user and also much longer (hours, even days), but I figure anyone playing with this demo wouldn't want to wait around that long.

For double the fun, open up a different browser and turn on notifcations there as well. Firefox, Chrome, or Opera should all work; Safari doesn't yet support the Push API. Probably no one needs this many notifications from the same app, but I think it's a neat proof-of-concept for the sorts of applications one could create with service workers and the ability to push content to users at will.  

## Running the app locally
This app was built using Ruby 2.6.3 and Rails 6.0.0.

* Configuration
There's a lot going on under the hood here, so stay tuned for a rundown of all the goodies! Now if only there were some way I could let you know when I've finished, some way I could notify you of my progress that would demand the absolute minimum effort on your part...

* Database creation
```bash
$ bundle exec rails db:migrate
```
* Database initialization
```bash
$ bundle exec rails db:seed
```
* Services (job queues, cache servers, search engines, etc.)
```bash
$ redis-server
```
```bash
$ sidekiq -q default
```
