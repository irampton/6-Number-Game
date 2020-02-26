# 6-Number-Game
>An algorithm to play the “6 Number Game”

## How the Game Works
6 numbers are randomly generated and given to the play one at a time. The player has a 2x3 grid and chooses a slot to place each number. After 6 numbers are given and the grid is full the bottom 3-digit number is subtracted from the top 3-digit number to give the score for the round. If the result is negative or less than 0 then your score is 1000. The lowest score wins, multiple rounds are usually played.
### Sample
The player starts with a blank grid

```
_ _ _

_ _ _
```
They are then given a random number, say 1, and can place it in any open slot
```
_ _ _

1 _ _
```
Then another number, say a 2
```
2 _ _

1 _ _
```
The process continues until the grid is filled out. No number may change position after it is placed and the next number is given.
```
2 0 1

1 5 6
```
When all the sixth number is given, you calculate your score by subtracting the lower number from the top number. in this case `156` is subtracted from `201` to give a score of `45` which is then added to your total score for the game. If the result is less than 0, or negative, then `1000` is added to score instead.

## How the Algorithm Works
Our algorithm works by looking at _all_ of the possible combinations that result from placing the given number in each slot.  Each score is evaluated and added a list. The lists are each evaluated by statistical algorithms and the list spot with the highest chance of a lower score is chosen. The process repeats with each new number. 


***

## Links
https://simplestatistics.org/docs/
