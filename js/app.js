var HtmlObjectCreation = /** @class */ (function () {
    function HtmlObjectCreation() {
    }
    HtmlObjectCreation.createHTMLButtonObject = function (parentDiv, objectType, label, idName, method) {
        var parentHTMLDiv = document.getElementById(parentDiv);
        var newButton = document.createElement(objectType);
        newButton.innerText = label;
        newButton.setAttribute('class', "btn btn-primary");
        newButton.setAttribute('id', idName);
        newButton.setAttribute('onclick', method);
        newButton.setAttribute('style', "display: block");
        parentHTMLDiv.appendChild(newButton);
    };
    HtmlObjectCreation.createHTMLInputObject = function (parentDiv, labelText, inputId) {
        var parentHTMLDiv = document.getElementById(parentDiv);
        var newLabel = document.createElement("label");
        var newInput = document.createElement("input");
        newLabel.innerText = labelText;
        newInput.setAttribute('id', inputId);
        newInput.setAttribute('type', 'text');
        newInput.setAttribute('style', "display: block");
        parentHTMLDiv.appendChild(newLabel);
        parentHTMLDiv.appendChild(newInput);
    };
    HtmlObjectCreation.clearHTMLDiv = function (divToClear) {
        document.getElementById(divToClear).innerHTML = "";
    };
    return HtmlObjectCreation;
}());
///<reference path="HtmlObjectCreation.ts"/>
var MenuCreation = /** @class */ (function () {
    function MenuCreation() {
    }
    MenuCreation.prototype.menuTitle = function () {
        var welcomeString = "Welcome to the Casino!<br>" +
            "===============================================<br>" +
            "Please enter your username and amount of money below.<br>";
        return welcomeString;
    };
    MenuCreation.prototype.casinoTitle = function () {
        var outputString = "Please select a casino game to playCraps!<br>" +
            "===============================================<br>";
        return outputString;
    };
    MenuCreation.prototype.playAgainButtonLogic = function (method) {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Yes", "yesButton", "method");
        document.getElementById("yesButton").style.display = "inline";
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "No", "noButton", "blackJack.playAgainLogic()");
        document.getElementById("noButton").style.display = "inline";
        document.getElementById("noButton").setAttribute('class', "btn btn-danger");
    };
    MenuCreation.prototype.backToMainMenuButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        document.getElementById("gameSelectionButtons").style.display = 'inline';
    };
    MenuCreation.prototype.backToMainMenu = function () {
        console.log("Going back to Main Menu");
        this.backToMainMenuButtonLogic();
        document.getElementById("display").innerHTML = menuCreation.casinoTitle();
    };
    return MenuCreation;
}());
var WebPageInteraction = /** @class */ (function () {
    function WebPageInteraction() {
        this.verifyEntry = false;
        this.displayElement = document.getElementById("display");
        this.userInputElement = document.getElementById("submit");
    }
    WebPageInteraction.getInstance = function () {
        if (!WebPageInteraction.instance) {
            WebPageInteraction.instance = new WebPageInteraction();
            // ... any one time initialization goes here ...
        }
        return WebPageInteraction.instance;
    };
    WebPageInteraction.prototype.displayToWebpage = function (input) {
        this.displayElement = document.getElementById("display");
        this.displayElement.innerHTML += input;
        this.displayElement.innerHTML += "<br/>";
        this.displayElement.scrollTop = this.displayElement.scrollHeight * 2;
    };
    WebPageInteraction.prototype.addElement = function (parentId, elementTag, elementId, html) {
        // Adds an element to the document
        var p = document.getElementById(parentId);
        var newElement = document.createElement(elementTag);
        newElement.setAttribute('id', elementId);
        newElement.innerHTML = html;
        p.appendChild(newElement);
    };
    return WebPageInteraction;
}());
var Casino = /** @class */ (function () {
    function Casino() {
        this.submitButton = document.getElementById("generalSubmitButton");
        this.gameSelectionButtons = document.getElementById("gameSelectionButtons");
    }
    Casino.prototype.createPlayer = function () {
        var playerName = document.getElementById("playerName").value;
        var playerMoney = document.getElementById("playerMoney").value;
        if (playerName.match("[a-z]+") && playerMoney.match("\\d+")) {
            document.getElementById("newUserForm").style.display = "none";
            this.submitButton.style.display = "none";
            this.gameSelectionButtons.style.display = "inline";
            this.aPlayer = new Player(playerName, parseFloat(playerMoney));
            document.getElementById("playersName").innerHTML = "Player's Name: " + this.aPlayer.getName();
            document.getElementById("playersMoney").innerHTML = "Player's Money: $" + this.aPlayer.getMoney();
            //currentUserInfo.hidden = false;
            console.log("Got this info from user: " + this.aPlayer.getName() + " " + this.aPlayer.getMoney());
            WebPageInteraction.getInstance().displayToWebpage("Your account has been created, " + playerName + "!<br>");
            WebPageInteraction.getInstance().displayToWebpage(menuCreation.casinoTitle());
        }
        else {
            WebPageInteraction.getInstance().displayToWebpage("Please enter a valid name or amount of money.<br>");
        }
    };
    ;
    return Casino;
}());
var CrapsButtonLogic = /** @class */ (function () {
    function CrapsButtonLogic() {
        this.primaryButton = document.getElementById("primaryButton");
        this.gameSelectionButtons = document.getElementById("gameSelectionButtons");
        this.nameOfLabel = document.getElementById("nameOfLabel");
        this.userInputGroup = document.getElementById("userInputGroup");
        this.generalSubmitButton = document.getElementById("generalSubmitButton");
        //this.playersMoney = document.getElementById("playersMoney");
    }
    CrapsButtonLogic.prototype.crapsIntro = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        document.getElementById("display").innerHTML = "<br>Welcome to the BlackJack table!<br>" +
            "You have $" + casino.aPlayer.getMoney().toString();
        console.log(casino.aPlayer.getMoney().toString());
    };
    CrapsButtonLogic.prototype.takeBetButtonLogic = function () {
        document.getElementById("gameSelectionButtons").style.display = "none";
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLInputObject("buttonLogic", "Bet Amount", "newButtonInput");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Place Bet", "newButton", "blackJack.takeBet()");
    };
    CrapsButtonLogic.prototype.rollDiceButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Roll Dice", "newButton", "blackJack.dealCards()");
    };
    CrapsButtonLogic.prototype.playAgainButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Yes", "yesButton", "blackJack.playAgainLogic()");
        document.getElementById("yesButton").style.display = "inline";
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "No", "noButton", "blackJack.playAgainLogic()");
        document.getElementById("noButton").style.display = "inline";
        document.getElementById("noButton").setAttribute('class', "btn btn-danger");
    };
    CrapsButtonLogic.prototype.backToMainMenuButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        document.getElementById("gameSelectionButtons").style.display = 'inline';
    };
    return CrapsButtonLogic;
}());
var CardGames = /** @class */ (function () {
    function CardGames() {
    }
    CardGames.prototype.CardGames = function (aPlayer) {
        this.deck = new Deck();
        this.deck.shuffle();
    };
    CardGames.prototype.getPlayer = function () {
        return this.player;
    };
    CardGames.prototype.setPlayer = function (player) {
        this.player = player;
    };
    CardGames.prototype.getDeck = function () {
        return this.deck;
    };
    CardGames.prototype.setDeck = function (deck) {
        this.deck = deck;
    };
    CardGames.prototype.dealCard = function (playerToReceiveCard) {
        var card = this.getDeck().getCard();
        playerToReceiveCard.addToHand(card);
    };
    return CardGames;
}());
var Dice = /** @class */ (function () {
    function Dice(min, max) {
        this.min = min;
        this.max = max;
    }
    Dice.prototype.roll = function () {
        return Math.floor(Math.random() * this.max) + this.min;
    };
    return Dice;
}());
///<reference path="CardGames.ts"/>
///<reference path="bootstrapper.ts"/>
///<reference path="Dice.ts"/>
///<reference path="HtmlObjectCreation.ts"/>
var Craps = /** @class */ (function () {
    function Craps(casino) {
        this.dice1 = new Dice(1, 6);
        this.dice2 = new Dice(1, 6);
        this.casino = casino;
        this.primaryButton = document.getElementById("primaryButton");
        this.gameSelectionButtons = document.getElementById("gameSelectionButtons");
    }
    Craps.prototype.playCraps = function () {
        this.player = this.casino.aPlayer;
        this.printWelcomeMessage();
        crapsButtonLogic.takeBetButtonLogic();
        document.getElementById("newButton").setAttribute("onclick", "craps.takeBetAmount()");
    };
    Craps.prototype.printWelcomeMessage = function () {
        this.gameSelectionButtons.style.display = "none";
        WebPageInteraction.getInstance().
            displayToWebpage("Welcome to craps " + this.player.getName() + "!");
    };
    Craps.prototype.takeBetAmount = function () {
        var betAmountHTML = document.getElementById("newButtonInput");
        var betAmountString = betAmountHTML.value;
        console.log(betAmountString);
        var betAmountFloat = parseFloat(betAmountString);
        console.log(betAmountFloat);
        if (betAmountString.match("^[0-9]*$") && betAmountFloat > 0 && betAmountFloat <= this.player.getMoney()) {
            this.betAmount = betAmountFloat;
            console.log(this.betAmount);
            this.player.setMoney(this.player.getMoney() - betAmountFloat);
            document.getElementById("playersMoney").innerHTML = "Player's Money: $" + this.player.getMoney();
            WebPageInteraction.getInstance().displayToWebpage("<br>You bet $" + betAmountString);
            crapsButtonLogic.rollDiceButtonLogic();
            document.getElementById("newButton").setAttribute("onclick", "craps.rollDice()");
        }
        else {
            WebPageInteraction.getInstance().displayToWebpage("<br>Please enter a valid amount to bet.");
        }
    };
    Craps.prototype.rollDice = function () {
        this.diceOneValue = this.dice1.roll();
        this.diceTwoValue = this.dice2.roll();
        console.log(this.diceOneValue);
        console.log(this.diceTwoValue);
        this.sumOfRolls = this.diceOneValue + this.diceTwoValue;
        console.log(this.sumOfRolls);
        this.printDiceRoll(this.sumOfRolls);
        if (this.sumOfRolls === 7 || this.sumOfRolls === 11) {
            this.winGameOfCraps();
        }
        else if (this.sumOfRolls === 2 || this.sumOfRolls === 3 || this.sumOfRolls === 12) {
            this.loseGameOfCraps();
        }
        else {
            this.target = this.sumOfRolls;
            WebPageInteraction.getInstance().displayToWebpage("<br>The new target is: " + this.target);
            document.getElementById("newButton").setAttribute("onclick", "craps.keepRollingDice()");
        }
    };
    Craps.prototype.keepRollingDice = function () {
        this.diceOneValue = this.dice1.roll();
        this.diceTwoValue = this.dice2.roll();
        this.sumOfRolls = this.diceOneValue + this.diceTwoValue;
        if (!(this.sumOfRolls === 7) && !(this.sumOfRolls === this.target)) {
            this.printDiceRoll(this.sumOfRolls);
        }
        else {
            this.printDiceRoll(this.sumOfRolls);
            if (this.sumOfRolls === 7) {
                this.loseGameOfCraps();
            }
            else if (this.sumOfRolls === this.target) {
                this.winGameOfCraps();
            }
        }
    };
    Craps.prototype.printDiceRoll = function (diceRollValue) {
        var diceOneImage = "<img src=images/dice/dice" + this.diceOneValue + ".png >";
        var diceTwoImage = "<img src=images/dice/dice" + this.diceTwoValue + ".png >";
        WebPageInteraction.getInstance().displayToWebpage("You rolled: " + diceOneImage + diceTwoImage + " (" + diceRollValue + ")");
    };
    Craps.prototype.winGameOfCraps = function () {
        WebPageInteraction.getInstance().displayToWebpage("<br>Congratulations you won!");
        var newMoneyAmount = this.player.getMoney() + this.betAmount * 2;
        this.player.setMoney(newMoneyAmount);
        WebPageInteraction.getInstance().displayToWebpage("You now have $" + this.player.getMoney() + " dollars!");
        document.getElementById("playersMoney").innerHTML = "Player's Money: $" + this.player.getMoney();
        this.playAgainLogic();
    };
    Craps.prototype.loseGameOfCraps = function () {
        WebPageInteraction.getInstance().displayToWebpage("Sorry you lost!<br>You now have $" + this.player.getMoney());
        this.playAgainLogic();
    };
    Craps.prototype.playAgainLogic = function () {
        WebPageInteraction.getInstance().displayToWebpage("<br>Would you like to play again?");
        menuCreation.playAgainButtonLogic("craps.playAgainLogic()");
        document.getElementById("yesButton").setAttribute("onclick", "craps.playCraps()");
        document.getElementById("noButton").setAttribute("onclick", "menuCreation.backToMainMenu()");
        return;
    };
    return Craps;
}());
///<reference path="HtmlObjectCreation.ts"/>
var BlackJackButtonLogic = /** @class */ (function () {
    function BlackJackButtonLogic() {
    }
    BlackJackButtonLogic.prototype.blackJackIntro = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        document.getElementById("display").innerHTML = "<br>Welcome to the BlackJack table!<br>" +
            "You have $" + casino.aPlayer.getMoney().toString();
        console.log(casino.aPlayer.getMoney().toString());
    };
    BlackJackButtonLogic.prototype.takeBetButtonLogic = function () {
        document.getElementById("gameSelectionButtons").style.display = "none";
        HtmlObjectCreation.createHTMLInputObject("buttonLogic", "Bet Amount", "newButtonInput");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Place Bet", "newButton", "blackJack.playerWins()");
    };
    BlackJackButtonLogic.prototype.dealCardsButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Deal Cards", "newButton", "blackJack.dealCards()");
    };
    BlackJackButtonLogic.prototype.hitOrStayButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Hit", "hitButton", "blackJack.hitLogic()");
        document.getElementById("hitButton").style.display = "inline";
        document.getElementById("hitButton").setAttribute('class', "btn btn-danger");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Stay", "stayButton", "blackJack.stayLogic()");
        document.getElementById("stayButton").style.display = "inline";
    };
    BlackJackButtonLogic.prototype.pressEnterToContinueButtonLogic = function () {
        HtmlObjectCreation.clearHTMLDiv("buttonLogic");
        HtmlObjectCreation.createHTMLButtonObject("buttonLogic", "button", "Press to Continue", "continueButton", "blackJack.dealerHitUntilFinished()");
    };
    return BlackJackButtonLogic;
}());
var Suit;
(function (Suit) {
    Suit[Suit["HEARTS"] = 0] = "HEARTS";
    Suit[Suit["DIAMONDS"] = 1] = "DIAMONDS";
    Suit[Suit["CLUBS"] = 2] = "CLUBS";
    Suit[Suit["SPADES"] = 3] = "SPADES";
})(Suit || (Suit = {}));
var Card = /** @class */ (function () {
    function Card(passedSuit, passedValue, passedSuitRepresentation, passedFaceRepresentation) {
        this.suit = passedSuit;
        this.value = passedValue;
        this.topCardRepresentation = " " + passedFaceRepresentation + passedSuitRepresentation;
    }
    Card.prototype.toString = function () {
        return this.topCardRepresentation;
    };
    Card.prototype.getTopCardRepresentation = function () {
        return this.topCardRepresentation;
    };
    Card.prototype.getValue = function () {
        return this.value;
    };
    Card.prototype.equals = function (aCard) {
        var cardOne = this.toString().substring(0, 2);
        var cardTwo = aCard.toString().substring(0, 2);
        if (cardOne.toLowerCase() === cardTwo.toLowerCase()) {
            return true;
        }
        else {
            return false;
        }
    };
    Card.suitSymbols = ["♡", "♢", "♧", "♤"];
    Card.faceSymbols = ["A", "J", "Q", "K"];
    return Card;
}());
///<reference path="Card.ts"/>
var Deck = /** @class */ (function () {
    function Deck() {
        this.populate();
    }
    Deck.prototype.getCard = function () {
        //        if(cards.size() == 0) {
        //            populate();
        //            shuffle();
        //        }
        return this.cards.pop();
    };
    Deck.prototype.getAllCards = function () {
        return this.cards;
    };
    Deck.prototype.populate = function () {
        this.cards = [];
        for (var suitIndex = 0; suitIndex < 4; suitIndex++) {
            var suit = Suit[suitIndex];
            for (var value = 1; value <= 13; value++) {
                if (value < 11) {
                    if (value == 1)
                        this.cards.push(new Card(suit, value, Card.suitSymbols[suitIndex], Card.faceSymbols[0]));
                    else
                        this.cards.push(new Card(suit, value, Card.suitSymbols[suitIndex], "" + value));
                }
                else
                    this.cards.push(new Card(suit, 10, Card.suitSymbols[suitIndex], Card.faceSymbols[value - 10]));
            }
        }
        this.shuffle();
    };
    Deck.prototype.shuffle = function () {
        for (var i = this.cards.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.cards[j], this.cards[i]], this.cards[i] = _a[0], this.cards[j] = _a[1];
        }
        var _a;
    };
    return Deck;
}());
var Player = /** @class */ (function () {
    function Player(name, money) {
        this.hand = [];
        this.name = name;
        this.money = money;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.setMoney = function (money) {
        this.money = money;
    };
    Player.prototype.getMoney = function () {
        return this.money;
    };
    Player.prototype.addToHand = function (card) {
        this.hand.push(card);
    };
    Player.prototype.clearHand = function () {
        this.hand = [];
    };
    Player.prototype.getHand = function () {
        return this.hand;
    };
    Player.prototype.getScore = function () {
        return this.score;
    };
    Player.prototype.calculateScore = function () {
        var sum = 0;
        for (var _i = 0, _a = this.hand; _i < _a.length; _i++) {
            var card = _a[_i];
            sum += card.getValue();
        }
        if (this.isAceInHand() && sum <= 11) {
            sum += 10;
        }
        this.score = sum;
        return sum;
    };
    Player.prototype.isAceInHand = function () {
        for (var _i = 0, _a = this.hand; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getValue() == 1) {
                return true;
            }
        }
        return false;
    };
    return Player;
}());
///<reference path="Deck.ts"/>
///<reference path="Player.ts"/>
var BlackJack = /** @class */ (function () {
    function BlackJack(casino) {
        this.casino = casino;
        this.dealer = new Player("Dealer", 1000);
    }
    BlackJack.prototype.getDealer = function () {
        return this.dealer;
    };
    BlackJack.prototype.setDealer = function (dealer) {
        this.dealer = dealer;
    };
    BlackJack.prototype.getPot = function () {
        return this.pot;
    };
    BlackJack.prototype.setPot = function (pot) {
        this.pot = pot;
    };
    BlackJack.prototype.takeBet = function (amountToBet) {
        this.pot += amountToBet;
    };
    BlackJack.prototype.playBlackJack = function () {
        this.player = casino.aPlayer;
        this.player.clearHand();
        this.dealer.clearHand();
        this.deck = new Deck();
        this.deck.shuffle();
        this.pot = 0.0;
        blackJackConsole.blackJackIntro();
        blackJackConsole.takeBetButtonLogic();
        document.getElementById("newButton").setAttribute("onclick", "blackJack.takeBetAmount()");
    };
    BlackJack.prototype.takeBetAmount = function () {
        var betAmountHTML = document.getElementById("newButtonInput");
        var betAmountString = betAmountHTML.value;
        var betAmountFloat = parseFloat(betAmountString);
        if (betAmountString.match("^[0-9]*$") && betAmountFloat > 0 && betAmountFloat <= this.player.getMoney()) {
            this.pot += betAmountFloat;
            this.player.setMoney(this.player.getMoney() - betAmountFloat);
            document.getElementById("playersMoney").innerHTML = "Player's Money: $" + this.player.getMoney();
            WebPageInteraction.getInstance().displayToWebpage("<br>You bet $" + betAmountString);
            blackJackConsole.dealCardsButtonLogic();
            document.getElementById("newButton").setAttribute("onclick", "blackJack.dealCards()");
        }
        else {
            WebPageInteraction.getInstance().displayToWebpage("<br>Please enter a valid amount to bet.");
        }
    };
    BlackJack.prototype.dealCards = function () {
        for (var i = 0; i < 2; i++) {
            this.dealCard(this.player);
            this.dealCard(this.dealer);
        }
        WebPageInteraction.getInstance().displayToWebpage("<br>This is your hand: <br>" + this.player.getHand().toString() + " (" + this.player.calculateScore() + ")");
        if (this.checkFor21()) {
            //this.checkFor21();
        }
        else {
            WebPageInteraction.getInstance().displayToWebpage("<br>This is the dealers top card: <br>" + this.dealer.getHand()[0].toString());
            WebPageInteraction.getInstance().displayToWebpage("<br>Would you like to hit or stay?<br>");
            blackJackConsole.hitOrStayButtonLogic();
            document.getElementById("hitButton").setAttribute("onclick", "blackJack.hitLogic()");
            document.getElementById("stayButton").setAttribute("onclick", "blackJack.stayLogic()");
        }
    };
    BlackJack.prototype.dealCard = function (playerToReceiveCard) {
        var card = this.deck.getCard();
        playerToReceiveCard.addToHand(card);
    };
    BlackJack.prototype.hitLogic = function () {
        this.dealCard(this.player);
        WebPageInteraction.getInstance().displayToWebpage("Your hand is now: " + this.player.getHand().toString() + " (" + this.player.calculateScore() + ")");
        if (!this.checkFor21()) {
            if (this.player.getScore() > 21) {
                WebPageInteraction.getInstance().displayToWebpage("It's a bust, you lose!");
                this.playAgainLogic();
                return;
            }
            WebPageInteraction.getInstance().displayToWebpage("<br>Would you like to hit or stay?<br>");
            console.log(this.player.getHand().toString());
        }
    };
    BlackJack.prototype.stayLogic = function () {
        WebPageInteraction.getInstance().displayToWebpage("You stayed, the dealers hand is: " + this.dealer.getHand().toString() +
            " (" + this.dealer.calculateScore() + ")");
        if (!this.checkFor21()) {
            //press enter to continue
            blackJackConsole.pressEnterToContinueButtonLogic();
            document.getElementById("continueButton")
                .setAttribute("onclick", "blackJack.dealerHitUntilFinished()");
        }
    };
    BlackJack.prototype.dealerHitUntilFinished = function () {
        if (this.dealer.calculateScore() <= 17) {
            this.dealCard(this.dealer);
            WebPageInteraction.getInstance().displayToWebpage("The dealer hit, the dealers hand is now: " + this.dealer.getHand().toString() + " (" + this.dealer.calculateScore() + ")");
            console.log(this.dealer.calculateScore());
        }
        else if (this.dealer.calculateScore() > 17) {
            if (this.determineWinner()) {
                this.playerWins();
            }
            else {
                WebPageInteraction.getInstance().displayToWebpage("You lose!");
                this.playAgainLogic();
            }
        }
    };
    BlackJack.prototype.checkFor21 = function () {
        this.player.calculateScore();
        this.dealer.calculateScore();
        console.log("Players score: " + this.player.getScore());
        console.log("Dealers score: " + this.dealer.getScore());
        if (this.player.getScore() === 21 && !(this.dealer.getScore() === 21)) {
            WebPageInteraction.getInstance().displayToWebpage("You got 21!");
            this.playerWins();
            return true;
        }
        else if (this.player.getScore() === 21 && this.dealer.getScore() === 21) {
            console.log("It's a tie!");
            var amountWon = this.pot;
            WebPageInteraction.getInstance().displayToWebpage("It's a tie, you collected: $" + amountWon);
            this.player.setMoney(this.player.getMoney() + amountWon);
            document.getElementById("playersMoney").innerHTML = "Player's Money: $" + this.player.getMoney();
            this.playAgainLogic();
            //do tie logic
            return true;
        }
        else if (!(this.player.getScore() === 21) && this.dealer.getScore() === 21) {
            WebPageInteraction.getInstance().displayToWebpage("The dealer got 21, you lose!");
            this.playAgainLogic();
            return true;
        }
    };
    BlackJack.prototype.determineWinner = function () {
        return (this.player.getScore() === 21 && !(this.dealer.getScore() === 21)) ||
            (this.player.getScore() < 21 && this.dealer.getScore() < this.player.getScore()) ||
            (this.player.getScore() < 21 && this.dealer.getScore() > 21);
    };
    BlackJack.prototype.playerWins = function () {
        var amountWon = this.pot * 2;
        WebPageInteraction.getInstance().displayToWebpage("You win and collected: $" + amountWon);
        this.player.setMoney(this.player.getMoney() + amountWon);
        document.getElementById("playersMoney").innerHTML = "Player's Money: $" + this.player.getMoney();
        this.playAgainLogic();
    };
    BlackJack.prototype.playAgainLogic = function () {
        WebPageInteraction.getInstance().displayToWebpage("<br>Would you like to play again?");
        menuCreation.playAgainButtonLogic("blackJack.playAgainLogic()");
        document.getElementById("yesButton").setAttribute("onclick", "blackJack.playBlackJack()");
        document.getElementById("noButton").setAttribute("onclick", "menuCreation.backToMainMenu()");
        return;
    };
    return BlackJack;
}());
///<reference path="MenuCreation.ts"/>
///<reference path="WebPageInteraction.ts"/>
///<reference path="Casino.ts"/>
///<reference path="CrapsButtonLogic.ts"/>
///<reference path="Craps.ts"/>
///<reference path="BlackJackButtonLogic.ts"/>
///<reference path="BlackJack.ts"/>
var menuCreation = new MenuCreation();
WebPageInteraction.getInstance().displayToWebpage(menuCreation.menuTitle());
var casino = new Casino();
var crapsButtonLogic = new CrapsButtonLogic();
var craps = new Craps(casino);
var blackJackConsole = new BlackJackButtonLogic();
var blackJack = new BlackJack(casino);
//# sourceMappingURL=app.js.map