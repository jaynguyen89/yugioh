export function getNewToDeck(toDeck, card) {
    var newToDeck = new Array();
    var insertIndex = getInsertIndex(toDeck, card);

    newToDeck = (toDeck.length === 0 || insertIndex === toDeck.length) ?
                toDeck.concat([card]) :
                toDeck.slice(0, insertIndex).concat([card]).concat(toDeck.slice(insertIndex));

    return newToDeck;
}

export function getNewFromDeck(fromDeck, card, origin) {
    var newFromDeck = new Array();
    switch (origin) {
        case "side":
            var cardIndexInSideDeck = fromDeck.indexOf(card);
            newFromDeck = fromDeck.slice(0, cardIndexInSideDeck).concat(fromDeck.slice(cardIndexInSideDeck + 1));
            break;
        default:
            var cardIndexInCardVault = fromDeck.indexOf(card);
            newFromDeck = fromDeck.slice(0, cardIndexInCardVault).concat(fromDeck.slice(cardIndexInCardVault + 1));
            break;
    }

    return newFromDeck;
}

export function importImages(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export function checkXyz(type) {
    return (type.toLowerCase().indexOf("xyz") !== -1);
}

export function getInsertIndex(deck, card) {
    var cardType = getCardType(card.type);

    var insertIndex = -1;
    switch (cardType) {
        case "beast":
            for (var i = 0; i < deck.length; i++) {
                if ((i === 0 && getCardType(deck[i].type) !== "beast") || deck[i].title === card.title) {
                    insertIndex = i;
                    break;
                }

                if (i === deck.length - 1 || getCardType(deck[i + 1].type) !== "beast") {
                    insertIndex = i + 1;
                    break;
                }
            }

            break;
        case "spell":
            for (var i = 0; i < deck.length; i++) {
                if ((i === 0 && (getCardType(deck[i].type) === "trap" || getCardType(deck[i].type) === "xyz")) || deck[i].title === card.title) {
                    insertIndex = i;
                    break;
                }

                if (i === deck.length - 1 || getCardType(deck[i + 1].type) === "trap" || getCardType(deck[i + 1].type) === "xyz") {
                    insertIndex = i + 1;
                    break;
                }
            }    

            break;
        case "trap":
            for (var i = 0; i < deck.length; i++) {
                if ((i === 0 && getCardType(deck[i].type) === "xyz") || deck[i].title === card.title) {
                    insertIndex = i;
                    break;
                }

                if (i === deck.length - 1 || getCardType(deck[i + 1].type) === "xyz") {
                    insertIndex = i + 1;
                    break;
                }
            }
            
            break;
        default: //xyz
            for (var i = 0; i < deck.length - 1; i++) {
                if (deck[i].title === card.title) {
                    insertIndex = i;
                    break;
                }

                if (i === deck.length - 1)
                    insertIndex = i + 1;
            }
            
            break;
    }

    return insertIndex;
}

function getCardType(type) {
    if (type.toLowerCase().indexOf("spell") !== -1)
        return "spell";
    else if (type.toLowerCase().indexOf("trap") !== -1)
        return "trap";
    else if (type.toLowerCase().indexOf("xyz") !== -1)
        return "xyz";
    else
        return "beast";
}

export function verifyDeck(deck, context) {
    var deckResult = deepScanDeck(deck, true, 0, context);

    if (deckResult[0] === 1) {
        if (context === "main")
            alert("No problems found in Main Deck.");
        else if (context === "extra")
            alert("No problems found in Extra Deck.");
        else
            alert("No problems found in Side Deck. Checking Done!");
    }
    else {
        while (deckResult[0] !== 3) {
            if (deckResult[0] === -1)
                alert("Error: Main Deck contains less than 30 cards.");

            if (deckResult[0] === 0)
                alert("Error: " + (context === "main" ? "Main Deck" : (context === "extra" ? "Extra Deck" : "Side Deck")) +
                " contains more than " + (context === "main" ? "50" : "15") + " cards.");

            if (deckResult[0] === 2)
                alert("Error: " + (context === "main" ? "Main Deck" : (context === "extra" ? "Extra Deck" : "Side Deck")) +
                " - more than 3 of card \"" + deck[deckResult[1]].title + "\". Found: " + deckResult[2] + " cards.");

            deckResult = deepScanDeck(deck, false, deckResult[1], context);
        }

        if (context === "main")
            alert("End of Main Deck's error report. Continue checking...");
        else if (context === "extra")
            alert("End of Extra Deck's error report. Continue checking...");
        else
            alert("End of Side Deck's error report. Checking Done!");
    }
}

function deepScanDeck(deck, flag, i, context) {
    var error = 1;
    var errorAt = 0;
    var countCard = 1;

    if (context === "main") {
        if (flag && deck.length < 30)
            error = -1;
        
        if (flag && deck.length > 50)
            error = 0;
    }
    else {
        if (flag && deck.length > 15)
            error = 0;
    }
    
    if (error === 1) {
        var index = (flag ? 0 : i);
        for (var j = index; j < deck.length; j++) {
            if (j === deck.length - 1) {
                error = (flag ? 1 : 3);
                continue;
            }
            
            if (deck[j].title === deck[j + 1].title)
                countCard += 1;
            
            if (deck[j].title !== deck[j + 1].title)
                countCard = 1;
            
            if (countCard > 3) {
                error = 2;
                errorAt = j;
                break;
            }
        }
    }

    return [error, errorAt, countCard];
}

export function getSearchedCards(deck, keyword) {
    var results = new Array();
    for (var i = 0; i < deck.length; i++)
        if (deck[i].title.toLowerCase().indexOf(keyword) !== -1)
            results.push(deck[i]);
    
    return results;
}