[![Typing SVG](https://readme-typing-svg.herokuapp.com?font=comfortaa&color=016EEA&size=24&width=500&lines=RateMe!;SoPra+Group+20)](https://git.io/typing-svg)

RateMe! is an online platform, where users can share and rate each others picture in fast and fun way.
## Introduction
This project was done for the course [“Software Engineering Lab” (SoPra)](https://hasel.dev/teachings/fs22-sopra/) at the [University of Zurich](https://www.uzh.ch/en.html). It should teach how to actually develop software in a team by creating our own bigger software project.

## Goals and Motivation
The main idea was to separate the picture from its uploader so the person who rates a pictures does not know, who's the uploader. This creates a more objective rating and every user has the abillity to get great ratings. The previous works do not influece the new ratings and the pictures must stand for themselves.
We want to create a platform wich is fun and easy to use. Everyone should have to possibility to be a star and be featured on the highlights page.
## Built With

* [Springboot](https://spring.io/) - Java framework to create a micro service
* [Gradle](https://gradle.org/) - Automated building and management tool
* [H2](https://www.h2database.com/html/main.html) - Database
* [React](https://reactjs.org/docs/getting-started.html) - Javascript library for the whole frontend
* [MUI](https://mui.com/) - CSS Component library
* [Github Projects](https://github.com/explore) - Project Management
* [Balsamiq](https://balsamiq.com/) - Mockups
* [Heroku](https://www.heroku.com/) - Deployment
* [SonarCloud](https://sonarcloud.io/ ) - Testing & Feedback of code quality

## Getting Started

The following passages will show you how to set up the project on your local machine.

### Prerequisites

We recommend to use the following IDE's:
#### Client
[Visual Studio](https://visualstudio.microsoft.com/de/) or
[Webstorm](https://www.jetbrains.com/webstorm/)
#### Server
[IntelliJ](https://www.jetbrains.com/idea/)


### Installing

For the client, you need to install the needed modules via npm:
```
npm install
```

And to start the client you use:

```
npm run dev
```
</br>

The frontend is running now on:
```
localhost:3000
```
</br>

For the server, you have to run the [Application](https://github.com/sopra-fs22-group-20/server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs22/Application.java) inside IntelliJ.

### Build

```bash
./gradlew build
```

### Run

```bash
./gradlew bootRun
```

### Test

```bash
./gradlew test
```

</br>

To setup the database and add some test pictures, you can click on the button "Demo Setup" once hte application is running.

</br>

## Running the tests

And to run the tests, you have to run the [Test](https://github.com/sopra-fs22-group-20/server/tree/main/src/test/java/ch/uzh/ifi/hase/soprafs22) package in your IDE.



## Deployment

To deploy the software to heroku, you only need to push the code to the master branch. The pipeline will  automatically deploy it over Github Actions.

## High-level components
### User
The user itself is one of the most important classes in the whole project. 1 user is owning n images and the user and it's credentials are mandatory to use the service. The object user is representing a real user of the service. See [User class](https://github.com/sopra-fs22-group-20/server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs22/entity/User.java). 
### Image
The image entity is a representation of an image uploaded by a user. So each image must be owned by a user, but the same user can have several images. The image itself gets also rated by different other users, so the rating, an attribute of image gets changed according to the ratings of the users. An image can only be rated once by a specific user. An image has also the attribute category, to define, which kind of image it is, for exemple dog or car.
See [Image class](https://github.com/sopra-fs22-group-20/server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs22/entity/Image.java).
### Game
The game is the real-time component of our project and the user is able to play the game agains another user. With the earned trophies, the user is able to boost his image, so the image is shown to more other user.
See [Game class](https://github.com/sopra-fs22-group-20/server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs22/entity/Game.java).
### Category
A category is an attribute by the image and defines what kind of image it is. It is important for the highlights page, as you can filter, which are the top images of a specific category.
See [Category class](https://github.com/sopra-fs22-group-20/server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs22/entity/Category.java).
## Illustrations for the main user flows
Now we want to show you some basic user flows with some screenshots:
### Rating
First of all, the user has to register/login:
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/LoginScreen.png" alt="screenshot" width="500"/>
</br>

Then, the user sees the home screen and can immediately start to rate the shown pictures by clicking on the stars right under the picture (here a bike):
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Rating_1.png" alt="screenshot" width="500"/>
</br>

After the rating, the user can continue with it as long as the user wants to. Or the user can select a specifc category (here random). The photo to rate is here a cat:
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Rating_2.png" alt="screenshot" width="500"/>
</br>

If you want to see the best rated pictures of category, for exemple cars, you can go the "Highlights" page and pick your category:
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Highlights_Cars.png" alt="screenshot" width="500"/>
</br>


### Uploading

To upload a picture, the user has to click on "Upload" in the menu bar. Then, choose the file to upload and add the credentials. You can also add the location by dragging and dropping marker on the map.
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Upload.png" alt="screenshot" width="500"/>
</br>

To see how your picture performs, you have to go to "Pictures":
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Upload2.png" alt="screenshot" width="500"/>
</br>

Here you can see the ratings of your picture.

### Playing the game
Winning the game gives you trophies, you can spend to boost your image on the "Pictures" page. To play the game, you have to click on the egg on the home screen:
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Rating_1.png" alt="screenshot" width="500"/>
</br>

After another player joined the game, you have to click the egg 100 times and be faster than your oponent. After winning, you will receive your trophies.
</br>

<img src="https://raw.githubusercontent.com/sopra-fs22-group-20/server/main/readme%20Addons/Game.png" alt="screenshot" width="500"/>
</br>


## Roadmap
The following features could be implemented next to improve RateMe!
### Tournament mode in the game
The game could get a new mode, where the users could earn more trophies by adding several game rounds and be the champion!
### Mobile App feature
Optimize the application, so it is compatible for mobile users (smartphones iOS and Android).
### Advanced user profiles
The user profiles will be getting more settings, so the user could invidualise his profile by adding more credentials and a profile image. New user should get a generated profile image.
## Authors

* **Marcel Eymany (group leader)** - *Frontend, Mockups, Project Management* - [Github](https://github.com/kone54)
* **Omar Abo Hamida** - *Frontend, Setup of project in Github, Project Management* - [Github](https://github.com/oaboha)
* **Jamo Sharif** - *Backend, Testing, Project Management* - [Github](https://github.com/JSha91)
* **Jonathan Contreras Urzua** - *Backend, Database, Testing, Project Management* - [Github](https://github.com/JonathanContrerasM)
* **Louis Huber** - *Frontend, Testing, Mockups, Project Management* - [Github](https://github.com/L-Huber)|[Linkedin](https://www.linkedin.com/in/louis-huber/)


See also the list of [contributors for the server](https://github.com/sopra-fs22-group-20/server/graphs/contributors) and [contributors for the client](https://github.com/sopra-fs22-group-20/server/graphs/contributors) who participated in this project.

## License
[Apache license 2.0](https://github.com/sopra-fs22-group-20/server/blob/main/LICENSE)
## Acknowledgments
We changed the screenshots and added photos from [unsplash](https://unsplash.com) to not get in legal trouble with the copyrights of the images.
