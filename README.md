# GameHub

## Checklist

- [ ] frequent commits to github.
- [ ] filled out the self-evaluation.

## Self Grading Guide
<!--- Update the following line with your self-grade --->
<!--- Check the Rubric on Canvas for a guideline --->

I should get **(20)** out of 20 on this assignment.


## setup: 
    To set up the project first, clone the git hub repository using "git clone <repository name>"
    You then need to run "npm install" to install dependencies 
## run: 
    Run "npm run dev" to host the site on the local server then open the url returned in the CLI
## test:
    To test the project there are three test files that use playwright to test the fuctionality of the app
    run "npx playwright test" to run all tests or specify a test file at the end of that line to only run that one test "npx playwright test <test file name>"
 ## deploy: 
    This app was deployed to GitHub Pages with the "gh-pages" package. "npm run deploy" is used to build the project and push the output to the gh-pages branch where the GitHub Pages is deployed.
    URL: https://it3049c-lively-fa23.github.io/final-project-owen-oconnell
 ## architecture notes: 
    This app was built using react. Player information like name avatar and difficulty are saved in local storage through settings.jsx. The protected route makes it so you can only go to a game page if player information has been entered. 
    Games:
        Rock paper scissors
        Tic tac toe
        Wordle
        Simon Says
 ## credits:
    Game Room API: Made by Professor Yahya Gilany
    Dictonary validation for wordle with dictionaryapi.dev
    Random word generator for wordle with random-word-api.herokuapp.com

## Self-Reflection

- **How long it took me to finish this?**
<!-- Answer below this line -->
- It took me about one week to complete this project.

- **What do you think of this completion time?**
<!-- Answer below this line -->
- I think I completed it in a pretty good amount of time considering all of the other work I had in other classes

- **In hindsight, what would you do differently?**
- <!-- Answer below this line -->
- I would have made labels more accessible for tests, like adding aria-label at the start instead of when I had problems testing. I also would've tested the games more thoroughly so I didn't have to keep going back and editing code to get rid of bugs every time I noticed one.

- **What resources did you use?**
- <!-- Answer below this line -->
- I used course materials, Stack Overflow, W3 Schools, and other documentation sites to help understand concepts I was not as familiar with.