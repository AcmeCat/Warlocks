import logo from './penta.svg';
import './App.css';
import React from 'react';
//import data from '../src/data.json';
import Spells from './Components/Spells.js'
import Invocations from './Components/Invocations';
//import {Link} from 'react-scroll'


class App extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
      name: "NAME",
      species: "Human",
      patron: "The Void",
      level: 1,
      STR: 9,
      DEX: 9,
      CON: 9,
      INT: 9,
      WIS: 9,
      CHA: 9,
      hitPoints: 1,
      pact: "",
      proficiency: 2
    }
    this.letsBegin = this.letsBegin.bind(this);
  }

  
  

  letsBegin () {
    
    let level = this.getLevel();
    this.setState({
      level: level,
      name: this.getName(),
      species: this.getSpecies(),
      patron: this.getPatron()
    })
    let stats = this.getStats(level);
    this.setState({
      STR: stats[0],
      DEX: stats[1],
      CON: stats[2],
      INT: stats[3],
      WIS: stats[4],
      CHA: stats[5]
    })
    let hp = this.calcHitPoints(level, stats[2]);
    this.setState({
      hitPoints: hp
    })
    if (level > 2) {
      this.setState({
        pact: this.getPact()
      })
    } else{
      this.setState({
        pact: ''
      })
    }
    let proficiency = this.calcProficiency(level);
    this.setState({
      proficiency: proficiency
    })

    //scroll to stat block
    const element = document.getElementById('stat-block');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
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
        </header>
        <main id='stat-block'>
          
          <h2 className='warlock-name'>{this.state.name}</h2>
          <p className='running-title'>{this.state.species} Warlock, {this.randomBool(33) ? 'Devotee' : this.randomBool(50) ? 'Servant' : 'Minion'} of {this.state.patron}{this.state.pact !== '' ? ', Pact of the ' + this.state.pact : ''}</p>
          <hr/>
          <p><span className='title'>Level: </span>{this.state.level}</p>
          <p><span className='title'>Hit Points: </span>{this.state.hitPoints}</p>
          <p><span className='title'>Armor Class: </span> 12</p>
          <p><span className='title'>Speed: </span> 30</p>
          <hr/>
          <p><span className='title'>STR: </span>{this.state.STR} ({this.modString(this.getModFromStat(this.state.STR))}), 
            <span className='title'>DEX: </span>{this.state.DEX} ({this.modString(this.getModFromStat(this.state.DEX))}), 
            <span className='title'>CON: </span>{this.state.CON} ({this.modString(this.getModFromStat(this.state.CON))}),</p>
          <p><span className='title'>INT: </span>{this.state.INT} ({this.modString(this.getModFromStat(this.state.INT))}), 
            <span className='title'>WIS: </span>{this.state.WIS} ({this.modString(this.getModFromStat(this.state.WIS))}), 
            <span className='title'>CHA: </span>{this.state.CHA} ({this.modString(this.getModFromStat(this.state.CHA))})</p>
          <hr/>
          <p><span className='title'>Proficiency Bonus: </span> +{this.state.proficiency}</p>
          <p><span className='title'>Saving Throws: </span> WIS +{this.state.proficiency + this.getModFromStat(this.state.WIS)}, CHA +{this.state.proficiency + this.getModFromStat(this.state.CHA)}</p>
          <hr/>
          <Invocations level={this.state.level} pact={this.state.pact}/>
          <hr/>
          <Spells level={this.state.level}/>
          <hr/>
          <button className='project-button' onClick={this.letsBegin}>another</button>
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

  getSpecies = () => {
    return this.randomItem(this.species);
  }

  getPatron = () => {
    return this.randomItem(this.patrons);
  }

  getLevel = () => {return Math.floor(Math.random() * 20 + 1);}

  calcHitPoints = (lvl, con) => {
    return this.randomDiceRoll(lvl, 8, lvl * this.getModFromStat(con))
  }

  getPact = () => {
    return this.randomItem(this.pacts);
  }

  calcProficiency = (lvl) => {
    return Math.floor((lvl + 7) / 4);
  }

  /* stats */
  getStats = (level) => {
    let initialStats = [15, 14, 13, 12, 10, 8];
    let assignedStats = this.assignStats(initialStats);
    let adjustedStats = this.adjustStatsForBackground(assignedStats);
    let leveledStats = this.adjustStatsForLevel(adjustedStats, level);
    return leveledStats;
  }

  assignStats = (stats) => {
    let higherDexThanCon = this.randomBool(50);
    let higherIntThanWis = this.randomBool(50);
    let prefs = [5, higherDexThanCon ? 1 : 2, higherDexThanCon ? 2 : 1, higherIntThanWis? 3 : 4, higherIntThanWis? 4 : 3, 0]
    let assigned = prefs.map((ele) => stats[ele]);
    return assigned;
  }

  adjustStatsForBackground = (arr) => {
    let stats = [...arr];
    let primary = Math.floor(Math.random() * 6);
    let secondary = 0;
    do {
      secondary = Math.floor(Math.random() * 6);
    } while (primary === secondary);
    stats[primary] = stats[primary] + 2;
    stats[secondary] = stats[secondary] + 1;
    return stats;
  }

  adjustStatsForLevel = (arr, lvl) => {
    let stats = [...arr];
    let bonus = Math.floor(lvl / 4) * 2;
    console.log(lvl / 4);
    for (let i = bonus; i > 0; i--){
      if (stats[5] > 19) {
        if (this.randomBool(33)){
          stats[5]++;
        } else if (this.randomBool(50)){
          stats[3]++;
        } else {
          stats[2]++;
        }
      } else {
        stats[5]++;
      }
    }
    return stats;
  }

  getModFromStat = (stat) => {
    return stat > 9 ? Math.floor((stat - 10) / 2) : Math.floor((11 - stat) / 2) * -1;
  }

  modString = (mod) => {
    return mod < 0 ? mod.toString() : "+" + mod.toString();
  }

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

  firstNames = ['Harry', 'Gerry', 'Mavis', 'Verdun', 'Greg', 'Tim', 'Bartelomeo', 'Pontius', 'Gront', 'Miff', 'Pildrum', 'Arriety', 'Norj', 'Sem', 'Steve', 'Rodney', 'Milicent', 'Waldo', 'Eric', 'Tania', 'Rex', 'Reginald', 'Paul', 'Andrew', 'Brian', 'Bethany', 'Alden', 'Bowie', 'Brooklyn', 'Everly', 'Harlow', 'Apollo', 'Kingston', 'Zuma', 'Lyra', 'Lydia', 'Stephany', 'Byron', 'Atticus', 'Beckett', 'Jagger', 'Aleph', 'Alf', 'August', 'Calvin', 'Chance', 'Olu', 'Nassir', 'Edison'];
  nameAdjectives = ['Magnificent', 'Magic', 'Exceptional', 'Rugged', 'Wicked', 'Pestilent', 'Mad', 'Sickening', 'Malodorous', 'Rad', 'Malevolent', 'Bright', 'Dim', 'Gloomy', 'Pensive', 'Miserly', 'Tarnished', 'Indominable', 'Flimsy', 'Surly', 'Unfriendly', 'Ugly', 'Ill-Tempered', 'Brutal', 'Grumpy', 'Perverse', 'Uncivil', 'Crusty', 'Dour', 'Irritable', 'Morose', 'Rude', 'Gentile', 'Sophisticated', 'Uncouth', 'Coolest', 'Well Seasoned', 'Rambunctious', 'Cynical', 'Inbred', 'Sharp-Witted', 'Dim-Witted', 'Smooth', 'Streetwise', 'Sauve', 'Enchanted', 'Uncultured', 'Uncool', 'Unrefined']
  patrons = ['The Entity', 'Entropy', 'Ancient Unicorn', 'Arch Fey', 'Madness', 'Elder God', 'Arch Fiend', 'Devil', 'The Depths', 'Darkness', 'Celestial', 'Arch Lich', 'The Void'];
  species = ['Human', 'Elf', 'Half-Elf', 'Dwarf', 'Halfling', 'Gnome', 'Dragonborn', 'Half-Orc', 'Tiefling'];
  pacts = ['Blade', 'Chain', 'Tome'];
}

function Footer() {
  //console.log("calling footer")
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
