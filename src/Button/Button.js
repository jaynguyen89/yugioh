import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render () {
        return (
            <div class="ui two buttons">
                <div class="ui brown button">
                    <div class="ui simple dropdown">
                        <div class="text">Move To</div>
                        <i class="dropdown icon"></i>
                        <div class="menu">
                            <button
                                class={ this.props.deck === 'main' ? 'disabled item' : 'item' }
                                onClick={ this.props.moveToMain }
                            >Main Deck</button>
                            <button
                                class={ this.props.deck === 'extra' ? 'disabled item' : 'item' }
                                onClick={ this.props.moveToExtra }
                            >Extra Deck</button>
                            <button
                                class={ this.props.deck === 'side' ? 'disabled item' : 'item' }
                                onClick={ this.props.moveToSide }
                            >Side Deck</button>
                            <button
                                class={ this.props.deck === 'vault' ? 'disabled item' : 'item' }
                                onClick={ this.props.moveToVault }
                            >Card Vault</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Button;