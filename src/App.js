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
      ,
      STR: 9,
      DEX: 9,
      CON: 9,
      INT: 9,
      WIS: 9,
      CHA: 9
    }
    this.letsBegin = this.letsBegin.bind(this);
  }

  letsBegin () {
    //let stats = [1,2,3,4,5,6];
    let stats = this.getStats();
    this.setState({
      name: this.getName(),
      race: this.getRace(),
      patron: this.getPatron(),
      level: this.getLevel()
      ,
      STR: stats[0],
      DEX: stats[1],
      CON: stats[2],
      INT: stats[3],
      WIS: stats[4],
      CHA: stats[5]
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
          <p><span className='title'>Race: </span>{this.state.race}</p>
          <p><span className='title'>Patron: </span>{this.state.patron}</p>
          <p><span className='title'>Level: </span>{this.state.level}</p>
          <p><span className='title'>STR: </span>{this.state.STR}, <span className='title'>DEX: </span>{this.state.DEX}, <span className='title'>CON: </span>{this.state.CON},</p>
          <p><span className='title'>INT: </span>{this.state.INT}, <span className='title'>WIS: </span>{this.state.WIS}, <span className='title'>CHA: </span>{this.state.CHA}</p>
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

  getStats = () => {
    let initialStats = [9, 9, 9, 9, 9, 9];
    let rolledStats = initialStats.map(_ => this.randomDiceRoll(3, 6, 0)).sort((a, b) => a < b);
    let assignedStats = this.assignStats(rolledStats);
    return assignedStats;
  }

  assignStats = (stats) => {
    let higherDexThanCon = this.randomBool(50);
    let higherIntThanWis = this.randomBool(50);
    let prefs = [5, higherDexThanCon ? 1 : 2, higherDexThanCon ? 2 : 1, higherIntThanWis? 3 : 4, higherIntThanWis? 4 : 3, 1]
    let assigned = prefs.map((ele) => stats[ele]);
    return assigned;
  }

  // adjustStatsForRace = (arr) => {}

  // adjustStatsForLevel = (arr) => {}

  //utility functions

  randomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomBool = (percent) => {
    return Math.floor(Math.random() * 100) < percent ? true : false;
  }

  //reflects diceroll shorthand from d20 system eg. 3d6+3, 8d10+16, 2d4-1, etc.
  randomDiceRoll = (number, type, modifier) => {
    let rolls = new Array(number).fill(1).map(_ => {return Math.floor(Math.random() * type + 1)});
    return rolls.reduce((acc, val) => acc + val, modifier);
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
