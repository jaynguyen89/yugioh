import React, { Component } from 'react';
import yugioh from './yugioh.jpg';
import './App.css';
import Content from '../Content/Content';

class App extends Component {
  render() {
    return (
      <div class="ui card full-page">
        <div class="content">
          <div class="ui grid">
            <div class="fourteen wide column">
              <div class="header left floated myHeader">Yugi-Oh Decks</div><br/><br/><br/>
              <p>
                A free-to-play game, playable through most iOS and Android devices. It is currently available on iTunes and Google Play.
                During World Championship 2014, a tech demo was first shown and was playable.
              </p>
            </div>
            <div class="two wide column">
              <img src={ yugioh } class="ui tiny image right floated no-margin-top" alt="yugioh" />
            </div>
          </div>
        </div>
        <Content />
      </div>
    );
  }
}

export default App;