import React from 'react';
import tvStreamImage from './images/tv-stream.png';
import kingstonCityLogo from './images/kingstoncity-logo.png';
import greenGullyLogo from './images/greengully-logo.png';
import './App.css';

import Scoreboard from './Scoreboard';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {mode: 0};  // hidden
    this.handleToogleButtonClick = this.handleToogleButtonClick.bind(this);
  };

  handleToogleButtonClick() {
    this.setState(prevState => ({
        mode: (prevState.mode + 1) % 3  // Toggle between 3 modes
    }));
  }

  render() {

    const animations = [
                    [],   // 0 - hidden
                    [{ animation: 'main', delay: 0 }], // 1 - main
                    [ { animation: 'main', delay: 0 }, { animation: 'teamStat', delay: 0.6 } ] // 2 - main + teamStat
                  ];

    const animation = animations[this.state.mode];

    const mainColors = { scoreTextColor: '#fff',
                         scoreBgColor: '#00123f',
                        timeTextColor: '#fff',
                          timeBgColor: '#00123f',
                        statTextColor: '#aed7e2',
                       statValueColor: '#fff',
                          statBgColor: '#00123f',
                  };

    const teams = {homeTeam: { name: 'Kingston City',
                             code: 'KC',
                             logo: kingstonCityLogo,
                        textColor: '#fff',
                          bgColor: '#da261d',
                 secondaryBgColor: '#de3f39'},

                awayTeam: { name: 'Green Gully',
                            code: 'GG',
                            logo: greenGullyLogo,
                       textColor: '#1a4b39',
                         bgColor: '#fff',
                secondaryBgColor: '#eee'}
                };

    const teamStat = {statName: 'Red Cards',
                statValue: '0',
                statTeam: 'home'
              };

    return (
      <div className="App">
        <div className="tv-stream">
          <img src={tvStreamImage} alt="TV Stream" />
          <Scoreboard animation={animation}
                      mainColors={mainColors}
                          teams={teams}
                      teamStat={teamStat} />
        </div>

        <button className="btn-toggle" onClick={this.handleToogleButtonClick}>Toggle State</button>
      </div>
    );
  }
}

export default App;
