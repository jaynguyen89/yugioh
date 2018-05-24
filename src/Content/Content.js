import React, { Component } from 'react';
import './Content.css';
import Card from '../Card/Card';
import { countCards, checkXyz, getNewFromDeck, getNewToDeck, verifyDeck } from './custom.js';

import main_deck from './jsons/main_deck.json';
import extra_deck from './jsons/extra_deck.json';
import side_deck from './jsons/side_deck.json';
import card_vault from './jsons/card_vault.json';

class Content extends Component {
    constructor(props) {
        super(props);

        this.verifyDecks = this.verifyDecks.bind(this);
        this.revertDefault = this.revertDefault.bind(this);

        this.moveToMainDeck = this.moveToMainDeck.bind(this);
        this.moveToExtraDeck = this.moveToExtraDeck.bind(this);
        this.moveToSideDeck = this.moveToSideDeck.bind(this);
        this.moveToCardVault = this.moveToCardVault.bind(this);

        this.state = {
            mainDeck : main_deck,
            sideDeck : side_deck,
            extraDeck : extra_deck,
            cardVault : card_vault,
            isChanged : false
        }
    }

    verifyDecks() {
        const mainDeck = this.state.mainDeck.slice(0);
        const extraDeck = this.state.extraDeck.slice(0);
        const sideDeck = this.state.sideDeck.slice(0);
        
        verifyDeck(mainDeck, "main");
        verifyDeck(extraDeck, "extra");
        verifyDeck(sideDeck, "side");
    }

    revertDefault() {
        this.setState({
            mainDeck : main_deck,
            extraDeck : extra_deck,
            sideDeck : side_deck,
            cardVault : card_vault,
            isChanged : false
        });
    }

    moveToMainDeck(origin, card) {
        if (checkXyz(card.type))
            alert("This type of card cannot reside in Main Deck.");
        else {
            const fromDeck = (origin === "side" ? this.state.sideDeck.slice(0) : this.state.cardVault.slice(0));
            const toDeck = this.state.mainDeck.slice(0);

            let newToDeck = getNewToDeck(toDeck, card);
            let newFromDeck = getNewFromDeck(fromDeck, card, origin);

            this.setState({ mainDeck : newToDeck });
            
            if (origin === "side")
                this.setState({ sideDeck : newFromDeck });
            else
                this.setState({ cardVault : newFromDeck });

            this.setState({ isChanged : true });
        }
    }
    
    moveToExtraDeck(origin, card) {
        if (checkXyz(card.type)) {
            const fromDeck = (origin === "side" ? this.state.sideDeck.slice(0) : this.state.cardVault.slice(0));
            const toDeck = this.state.extraDeck.slice(0);

            let newToDeck = getNewToDeck(toDeck, card);
            let newFromDeck = getNewFromDeck(fromDeck, card, origin);

            this.setState({ extraDeck : newToDeck });
            
            if (origin === "side")
                this.setState({ sideDeck : newFromDeck });
            else
                this.setState({ cardVault : newFromDeck });

            this.setState({ isChanged : true });
        }
        else
            alert("This type of card cannot reside in Extra Deck.");
    }
    
    moveToSideDeck(origin, card) {
        const fromDeck = (origin === "main" ? this.state.mainDeck.slice(0) :
                          (origin === "extra" ? this.state.extraDeck.slice(0) : this.state.cardVault.slice(0)));
        const toDeck = this.state.sideDeck.slice(0);
        
        let newToDeck = getNewToDeck(toDeck, card);
        let newFromDeck = getNewFromDeck(fromDeck, card, origin);

        this.setState ({ sideDeck : newToDeck });

        if (origin === "main")
            this.setState({ mainDeck : newFromDeck });
        else if (origin === "extra")
            this.setState({ extraDeck : newFromDeck });
        else
            this.setState({ cardVault : newFromDeck });
        
        this.setState({ isChanged : true });
    }
    
    moveToCardVault(origin, card) {
        const fromDeck = (origin === "main" ? this.state.mainDeck.slice(0) :
                          (origin === "extra" ? this.state.extraDeck.slice(0) : this.state.sideDeck.slice(0)));
        const toDeck = this.state.cardVault.slice(0);

        let newToDeck = getNewToDeck(toDeck, card);
        let newFromDeck = getNewFromDeck(fromDeck, card, origin);

        this.setState({ cardVault : newToDeck });

        if (origin === "main")
            this.setState({ mainDeck : newFromDeck });
        else if (origin === "extra")
            this.setState({ extraDeck : newFromDeck });
        else
            this.setState({ sideDeck : newFromDeck });
        
        this.setState({ isChanged : true });
    }

    render() {
        return (
            <div class="myContent">
                <div class="content searchBox">
                    Search box
                </div>
                <div class="content">
                    <div class="ui stackable grid">
                        <div class="sixteen wide column">
                            <div class="ui card mainDeckContainer">
                                <div class="content mainDeckHeader">
                                    <div class="right floated headerLabel">{ this.state.mainDeck.length } cards</div>
                                    <p class="headerTitle">Main Deck</p>
                                </div>
                                <div class="content mainDeckContent">
                                    <div class="ui stackable grid">
                                        {
                                            this.state.mainDeck.map(function(card, i) {
                                                return (
                                                <Card key={ card.id } card={ card } deck={ 'main' }
                                                    moveToExtra={ () => alert('This type of card cannot reside in Extra Deck.') }
                                                    moveToSide={ () => this.moveToSideDeck('main', card) }
                                                    moveToVault={ () => this.moveToCardVault('main', card) } />
                                                );
                                            }, this)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="eight wide column">
                            <div class="ui card extraDeckContainer">
                                <div class="content extraDeckHeader">
                                    <div class="right floated headerLabel">{ this.state.extraDeck.length } cards</div>
                                    <p class="headerTitle">Extra Deck</p>
                                </div>
                                <div class="content extraDeckContent">
                                    <div class="ui stackable grid">
                                        {
                                            this.state.extraDeck.map(function(card, i) {
                                                return (
                                                <Card key={ card.id } card={ card } deck={ 'extra' }
                                                    moveToMain={ () => alert('This type of card cannot reside in Main Deck.') }
                                                    moveToSide={ () => this.moveToSideDeck('extra', card) }
                                                    moveToVault={ () => this.moveToCardVault('extra', card) } />
                                                );
                                            }, this)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="eight wide column">
                            <div class="ui card sideDeckContainer">
                                <div class="content sideDeckHeader">
                                    <div class="right floated headerLabel">{ this.state.sideDeck.length } cards</div>
                                    <p class="headerTitle">Side Deck</p>
                                </div>
                                <div class="content sideDeckContent">
                                    <div class="ui stackable grid">
                                        {
                                            this.state.sideDeck.map(function(card, i) {
                                                return (
                                                <Card key={ card.id } card={ card } deck={ 'side' }
                                                    moveToMain={ () => this.moveToMainDeck('side', card) }
                                                    moveToExtra={ () => this.moveToExtraDeck('side', card) }
                                                    moveToVault={ () => this.moveToCardVault('side', card) } />
                                                );
                                            }, this)
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="extra content">
                    <div class="ui two buttons myButtons">
                        <button class={ this.state.isChanged ? "ui green button" : "ui green button disabled" }
                                onClick={ () => this.verifyDecks() } >
                            Verify Decks
                        </button>
                        <button class={ this.state.isChanged ? "ui red button" : "ui red button disabled" }
                                onClick={ () => {if (window.confirm("Everything will be reverted to default. Continue?")) this.revertDefault()} }>
                            Revert Default
                        </button>
                    </div>
                </div>
                <div class="content">
                    <div class="row">
                        <div class="ui card vaultContainer">
                            <div class="content vaultHeader">
                                <div class="right floated headerLabel">{ this.state.cardVault.length } cards</div>
                                <p class="headerTitle">Card Vault</p>
                            </div>
                            <div class="content vaultContent">
                                <div class="ui stackable grid">
                                    {
                                        this.state.cardVault.map(function(card, i) {
                                            return (
                                            <Card key={ card.id } card={ card } deck={ 'vault' }
                                                moveToMain={ () => this.moveToMainDeck('vault', card) }
                                                moveToExtra={ () => this.moveToExtraDeck('vault', card) }
                                                moveToSide={ () => this.moveToSideDeck('vault', card) } />
                                            );
                                        }, this)
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Content;