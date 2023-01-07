import logo from './penta.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "NAME",
      patron: "The Void",
      level: 1
    }
    this.letsBegin = this.letsBegin.bind(this);
  }

  letsBegin () {
    this.setState({
      name: this.getName(),
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
          <p><span>Patron: </span>{this.state.patron}</p>
          <p><span>Level: </span>{this.state.level}</p>
        </main>
      </div>
    );
  }

  getName = () => {
    let name = this.randomItem(this.firstNames);
    if (this.randomBool(50)) {
      name = this.randomItem(this.nameAdjectives) + ' ' + name;
    } else {
      name += ' the ' + this.randomItem(this.nameAdjectives);
    }
    return name; 
  }

  getPatron = () => {
    return this.randomItem(this.patrons);
  }

  getLevel = () => {return Math.floor(Math.random() * 20 + 1);}

  randomItem = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  randomBool = (percent) => {
    return Math.floor(Math.random() * 100) < percent ? true : false;
  }

  firstNames = ['Harry', 'Gerry', 'Mavis', 'Verdun', 'Greg', 'Tim', 'Bartelomeo', 'Pontius', 'Gront', 'Miff', 'Pildrum', 'Arriety', 'Norj', 'Sem'];
  nameAdjectives = ['Magnificent', 'Magic', 'Exceptional', 'Rugged', 'Wicked', 'Pestilent', 'Mad', 'Sickening', 'Malodorous', 'Rad', 'Malevolent', 'Bright', 'Dim', 'Gloomy', 'Pensive', 'Miserly']
  patrons = ['The Entity', 'Entropy', 'Ancient Unicorn', 'Arch Fey', 'Madness', 'Elder God', 'Arch Fiend', 'Devil', 'The Depths', 'Darkness', 'Celestial', 'Arch Lich'];

}

export default App;
