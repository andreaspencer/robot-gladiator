// GAME FUNCTIONS

//random numerically value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() *(min-max + 1) + min);

    return value;
}

var fight= function(enemy) {
    //repeat and execute as long as the enemy robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {

    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.')
    // if player choses to skip
     if (promptFight === "skip" || promptFight === "SKIP") {
        var confirmSkip= window.confirm("Are you sure you'd like to quit?");

        if (confirmSkip) {
            window.alert(playerInfo.name + "has decided to skip this fight. Goodbye!");
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            console.log("playerInfo.money", playerInfo.money);
            break;
        }
     }
    //subtract the value of 'playerAttack' from the value of 'enemyHealth' and use that result to update the value in the 'enemyHealth' variable
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    enemy.health = Math.max(0, enemy.health - damage);
    //Log a resulting message to the console so we know that it worked
    console.log(
    playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining. "
    );
    // check enemy health 
    if (enemy.health <=0) {
        window.alert(enemy.name + " has died!");
        playerInfo.money = playerInfo.money + 20;
        break;
    }
    else {
        window.alert(enemy.name + " still has " + enemy.health + " health left. ")
    }
    //Subtract the value of 'enemyAttack' from the value of 'playerHealth' and use that result to update the value in the 'playerHealth' variable
    var damage = randomNumber(enemy.attack -3, enemy.attack);

    playerInfo.health= Math.max(0, playerInfo.health - damage);
    // Log a resulting message to the console so we know that it worked
    console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining. "
    );

    // check player's health
    if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        break;
    }
    else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining.")
    }
    } 
};

var startGame = function() {
    //reset player stats
    playerInfo.reset();

for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));
  
      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];
  
      // reset enemyHealth before starting new fight
      pickedEnemyObj.health = randomNumber(40, 60);
  
      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;
  
      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
          shop();
      } 
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }
  //after loop ends
  endGame();
};

var endGame = function () {
    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};

var shop = function() {
    //ask player what they'd like to do shop or continue
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerInfo.money >=7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");

            playerInfo.health = playerInfo.health + 20;
            playerInfo.money = playerInfo.money - 7;
            }
            else { 
                window.alert("You don't have enough money!");
            }
            
            break;
        case "UPGRADE": //new case
        case "upgrade":
            if (playerInfo.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            playerInfo.attack = playerInfo.attack + 6;
            playerInfo.money = playerInfo.money - 7;
            }

            else {
                window.alert("You don't have enough money!");
            }

            break;
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            break;
            default:
                window.alert("You did not pick a valid option. Try again.");
            shop();
            break;
    }
};

//player info
var playerInfo = {
    name: window.prompt ("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling Player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function () {
        if (this.money >=7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

//enemy info
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber (10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber (10,14)
    },
    {
        name: "Robo Tumbler",
        attack: randomNumber (10,14)
    }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]["attack"]);

 // start game when page loads
 startGame();