import React, { Component } from 'react';
import './Card.css';
import Button from '../Button/Button';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title : this.props.card.title,
            type : this.props.card.type,
            attack : this.props.card.attack,
            defense : this.props.card.defense,
            description: this.props.card.description,
            photo : this.props.card.photo,
            deck : this.props.deck
        };
    }

    render () {
        const images = importImages(require.context('./collection', false, /\.(png)$/));
        return (
            <div class={ (this.state.deck === 'main' || this.state.deck === 'vault') ? 'two wide column' : 'four wide column' }>
                <div class="ui card deckCard">
                    <div class="image">
                        <img src={ images[this.state.photo] } alt="yugioh" />
                    </div>
                    <div class="content">
                        <div class="row cardTitle">{ this.state.type }</div>
                        <p class="right floated">DEF/{ this.state.defense ? this.state.defense : '---' }</p>
                        <p>ATK/{ this.state.attack ? this.state.attack : '---' }</p>
                    </div>
                    <div class="content cardDesc">{ this.state.description }</div>
                    <div class="extra content">
                        <Button deck={ this.state.deck }
                            moveToMain={ this.props.moveToMain }
                            moveToExtra={ this.props.moveToExtra }
                            moveToSide={ this.props.moveToSide }
                            moveToVault={ this.props.moveToVault } />
                    </div>
                </div>
            </div>
        );
    }
}

function importImages(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
}

export default Card;