import logo from './penta.svg';
import './App.css';
import React from 'react';
//import data from '../src/data.json';
import Spells from './Components/Spells.js'
import Invocations from './Components/Invocations';
import Attributes from './Components/Attributes';
import NameAndTitle from './Components/NameAndTitle';
//import {Link} from 'react-scroll'


class App extends React.Component {

  

  constructor(props) {
    super(props);
    this.state = {
      name: "NAME",
      species: "Human",
      patron: "The Void",
      level: 1,
      attributes: {
        STR: {value: 9, mod: 0},
        DEX: {value: 9, mod: 0},
        CON: {value: 9, mod: 0},
        INT: {value: 9, mod: 0},
        WIS: {value: 9, mod: 0},
        CHA: {value: 9, mod: 0},

      },
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
      attributes: {
        STR: {value: stats[0], mod: this.getModFromStat(stats[0])},
        DEX: {value: stats[1], mod: this.getModFromStat(stats[1])},
        CON: {value: stats[2], mod: this.getModFromStat(stats[2])},
        INT: {value: stats[3], mod: this.getModFromStat(stats[3])},
        WIS: {value: stats[4], mod: this.getModFromStat(stats[4])},
        CHA: {value: stats[5], mod: this.getModFromStat(stats[5])}
      }
    })
    let hp = this.calcHitPoints(level, this.getModFromStat(stats[2]));
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
          <button className='generate-button' onClick={this.letsBegin}>begin ritual</button>
        </header>
        <main>
          <section id='options'>
            <h2 id='options-heading'>Eye of newt, and toe of frog...</h2>
            <form onSubmit={this.handleSubmit}>
              <label className='option'>
                Level:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className='option'>
                Species:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className='option'>
                Patron:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className='option'>
                Pact:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className='option'>
                Ecology:
                <input type="radio" value={this.state.value} onChange={this.handleChange} />
              </label>
              <label className='option'>
                Lair:
                <input type="radio" value={this.state.value} onChange={this.handleChange} />
              </label>
              <input type="submit" value="summon" className='generate-button'/>
            </form>
          </section>
          <section id='stats'>
            <div id='stat-block'>
              <NameAndTitle details={{'name': this.state.name, 'species': this.state.species, 'patron': this.state.patron, 'pact': this.state.pact}} />
              <hr/>
              <p><span className='title'>Level: </span>{this.state.level}</p>
              <p><span className='title'>Hit Points: </span>{this.state.hitPoints}</p>
              <p><span className='title'>Armor Class: </span> 12</p>
              <p><span className='title'>Speed: </span> 30</p>
              <hr/>
              <Attributes att={this.state.attributes}/>
              <hr/>
              <p><span className='title'>Proficiency Bonus: </span> +{this.state.proficiency}</p>
              <p><span className='title'>Saving Throws: </span> WIS +{this.state.proficiency + this.getModFromStat(this.state.attributes.WIS.value)}, CHA +{this.state.proficiency + this.getModFromStat(this.state.attributes.CHA.value)}</p>
              <hr/>
              <Invocations level={this.state.level} pact={this.state.pact}/>
              <hr/>
              <Spells level={this.state.level}/>
              <hr/>
            </div>
          </section>
          
          {/* <div id='map'>
            Hello
          </div> */}
          <div className='regenerate'>
            <button className='generate-button' onClick={this.letsBegin}>another</button>
          </div>
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

  calcHitPoints = (lvl, conMod) => {
    return this.randomDiceRoll(lvl, 8, lvl * conMod)
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
