import logo from './penta.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "NAME",
      race: "Human",
      patron: "The Void",
      level: 1
    }
    this.letsBegin = this.letsBegin.bind(this);
  }

  letsBegin () {
    this.setState({
      name: this.getName(),
      race: this.getRace(),
      patron: this.getPatron(),
      level: this.getLevel()
    })
  }

  render (){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            THE <span className='warlocks'>WARLOCKS</span> ARE COMING...
          </p>
          <button className='project-button' onClick={this.letsBegin}>generate</button>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
        </header>
        <main>
          <h2>{this.state.name}</h2>
          <p><span>Race: </span>{this.state.race}</p>
          <p><span>Patron: </span>{this.state.patron}</p>
          <p><span>Level: </span>{this.state.level}</p>
        </main>
        <Footer/>
      </div>
    );
  }

  // warlock details

  getName = () => {
    let name = this.randomItem(this.firstNames);
    if (this.randomBool(50)) {
      name = this.randomItem(this.nameAdjectives) + ' ' + name;
    } else {
      name += ' the ' + this.randomItem(this.nameAdjectives);
    }
    return name; 
  }

  getRace = () => {
    return this.randomItem(this.races);
  }

  getPatron = () => {
    return this.randomItem(this.patrons);
  }

  getLevel = () => {return Math.floor(Math.random() * 20 + 1);}

  //utility functions

  randomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomBool = (percent) => {
    return Math.floor(Math.random() * 100) < percent ? true : false;
  }

  firstNames = ['Harry', 'Gerry', 'Mavis', 'Verdun', 'Greg', 'Tim', 'Bartelomeo', 'Pontius', 'Gront', 'Miff', 'Pildrum', 'Arriety', 'Norj', 'Sem'];
  nameAdjectives = ['Magnificent', 'Magic', 'Exceptional', 'Rugged', 'Wicked', 'Pestilent', 'Mad', 'Sickening', 'Malodorous', 'Rad', 'Malevolent', 'Bright', 'Dim', 'Gloomy', 'Pensive', 'Miserly']
  patrons = ['The Entity', 'Entropy', 'Ancient Unicorn', 'Arch Fey', 'Madness', 'Elder God', 'Arch Fiend', 'Devil', 'The Depths', 'Darkness', 'Celestial', 'Arch Lich', 'The Void'];
  races = ['Human', 'Elf', 'Half-Elf', 'Dwarf', 'Halfling', 'Gnome', 'Dragonborn', 'Half-Orc', 'Tiefling'];
}

function Footer() {
  return (
    <div className='Footer'>
      <hr/>
      <p>Wizards of the Coast, Dungeons & Dragons, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries. © 2015 Wizards. All Rights Reserved.</p>
      <p>This (Web site) is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC. This (Web site) may use the trademarks and other intellectual property of Wizards of the Coast LLC, which is permitted under Wizards' Fan Site Policy (link). For example, Dungeons & Dragons® is a trademark(s) of Wizards of the Coast. For more information about Wizards of the Coast or any of Wizards' trademarks or other intellectual property, please visit their website at (www.wizards.com).</p>
      <hr/>
    </div>
  )
}

export default App;
