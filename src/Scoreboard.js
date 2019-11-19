import React from 'react';

import "./Scoreboard.css";

class Scoreboard extends React.Component {

    static defaultProps = {
        animation: []     
    }

    render() {
        const animation = this.props.animation;

        let showAnimations = {          // set defaults
            'main': {'show': false, 'delay': 0},
            'gameTime': {'show': false, 'delay': 0},
            'teamStat': {'show': false, 'delay': 0},
        };

        let delay = 0;
        let show = true;

        animation.map(item => {

            showAnimations[item.animation] = {'show': true, 'delay': item.delay}

        });

        // show gameTime only if main is show by it's self
        if(animation.length==1 && animation[0].animation=='main') {
            showAnimations['gameTime'] = {'show': true, 'delay': 0.2}
        }

        return (
            <div className="scoreboard">
                <MainScoreboardSection mainColors={this.props.mainColors}
                                            teams={this.props.teams}
                                            show={showAnimations['main'].show}
                                            delay={showAnimations['main'].delay} />

                <GameTimeSection mainColors={this.props.mainColors}
                                      show={showAnimations['gameTime'].show}
                                      delay={showAnimations['gameTime'].delay} />

                <TeamStatSection  mainColors={this.props.mainColors}
                                        team={(this.props.teamStat.statTeam === 'home')?
                                                this.props.teams.homeTeam : this.props.teams.awayTeam}
                                    teamStat={this.props.teamStat}
                                        show={showAnimations['teamStat'].show}
                                       delay={showAnimations['teamStat'].delay} />
            </div>
        )
    }
}

export default Scoreboard;


function MainScoreboardSection(props) {

    const mainColors = props.mainColors;
    const teams = props.teams;
    const homeTeam = teams.homeTeam;
    const awayTeam = teams.awayTeam;
    const show = props.show;
    const delay = props.delay;

    const bgTranistion = 0.2;
    const textTransition = 0.1;

    let scoreBgDelay = delay;
    let scoreTextDelay = delay;
    let teamBgDelay = delay;
    let teamTextDelay = delay;


    if(show) {
        scoreBgDelay += 0;
        scoreTextDelay += bgTranistion - textTransition;
        teamBgDelay += bgTranistion;
        teamTextDelay += bgTranistion + (bgTranistion - textTransition);
    } else {
        scoreBgDelay += bgTranistion;
        scoreTextDelay += bgTranistion - textTransition;
        teamBgDelay += 0;
        teamTextDelay += bgTranistion - textTransition; 
    }

    let hideClass = (show)? '' : 'hide';

    const homeTeamStyles = {
        color: homeTeam.textColor,
        backgroundColor: homeTeam.bgColor,
        borderRight: (show)? `14px solid ${homeTeam.secondaryBgColor}` : 'none',
        transition: `width ${bgTranistion}s ease-in ${teamBgDelay}s, border 0.1s ease-in ${teamTextDelay}s`
    };

    const homeTeamTextStyles = {
        transition: `opacity ${textTransition}s ease-in ${teamTextDelay}s`
    };

    const awayTeamStyles = {
        color: awayTeam.textColor,
        backgroundColor: awayTeam.bgColor,
        borderLeft: (show)? `14px solid ${awayTeam.secondaryBgColor}` : 'none',
        transition: `width ${bgTranistion}s ease-in ${teamBgDelay}s, border 0.1s ease-in ${teamTextDelay}s`
    };

    const awayTeamTextStyles = {
        transition: `opacity ${textTransition}s ease-in ${teamTextDelay}s`
    };

    const scoreStyles = {
        color: mainColors.scoreTextColor,
        backgroundColor: mainColors.scoreBgColor,
        transition: `width ${bgTranistion}s ease-out ${scoreBgDelay}s`
    };

    const scoreTextStyles = {
        transition: `opacity ${textTransition}s ease-in ${scoreTextDelay}s`
    };

    return (
        <div className="main-scoreboard">
            <div className="hometeam-code-outline">
                <div className={`hometeam-code ${hideClass}`} style={homeTeamStyles}>
                    <div className={`hometeam-code-text ${hideClass}`} style={homeTeamTextStyles}>{homeTeam.code}</div>
                </div>
            </div>

            <div className="game-score-outline">
                <div className={`game-score ${hideClass}`} style={scoreStyles}>
                    {/* TODO static text - needs to be dynamic */}
                    <div className={`game-score-text ${hideClass}`} style={scoreTextStyles}>0 - 4</div>
                </div>
            </div>
            <div className="awayteam-code-outline">
                <div className={`awayteam-code ${hideClass}`} style={awayTeamStyles}>
                    <div className={`awayteam-code-text ${hideClass}`} style={awayTeamTextStyles}>{awayTeam.code}</div>
                </div>
            </div>
            
        </div>
    );
}

function GameTimeSection(props) {

    const mainColors = props.mainColors;
    const show = props.show;
    const delay = props.delay;

    const bgTranistion = 0.4;
    const textTransition = 0.1;
    let bgDelay = delay;
    let textDelay = delay;
    if(show) {
        textDelay += (bgTranistion - textTransition);
    } 

    let hideClass = (show)? '' : 'hide';

    const timeStyles = {
        color: mainColors.timeTextColor,
        backgroundColor: mainColors.timeBgColor,
        transition: `width ${bgTranistion}s ease-in ${bgDelay}s`
    };

    const timeTextStyles = {
        color: mainColors.timeTextColor,
        backgroundColor: mainColors.timeBgColor,
        transition: `opacity ${textTransition}s ease-in ${textDelay}s`
    };

    return (
        <div className={`game-time ${hideClass}`} style={timeStyles}>
            {/* TODO static text - needs to be dynamic */}
            <div className={`game-time-text ${hideClass}`} style={timeTextStyles}>90:00</div>
        </div>
    );
}

function TeamStatSection(props) {
    const mainColors = props.mainColors;
    const team = props.team;
    const teamStat = props.teamStat;
    const show = props.show;
    const delay = props.delay;

    const bgTranistion = 0.4;
    const textTransition = 0.1;
    const gapDelay = 0.1;
    let teamBgDelay = delay;
    let teamTextDelay = delay;
    let statBgDelay = delay;
    let statTextDelay = delay;

    if(show) {
        teamBgDelay += 0;
        teamTextDelay += (bgTranistion - textTransition);
        statBgDelay += gapDelay + bgTranistion;
        statTextDelay += gapDelay + bgTranistion + (bgTranistion - textTransition);
    } else {
        statBgDelay += 0;
        statTextDelay += 0;
        teamBgDelay += gapDelay + bgTranistion;
        teamTextDelay += gapDelay + bgTranistion;
    }

    let hideClass = (show)? '' : 'hide';

    const teamStyles = {
        color: team.textColor,
        backgroundColor: team.bgColor,
        transition: `width ${bgTranistion}s ease-in ${teamBgDelay}s`
    };

    const teamLogoStyles = {
        transition: `opacity ${textTransition}s ease-in ${teamTextDelay}s`
    };

    const teamNameStyles = {
        transition: `opacity ${textTransition}s ease-in ${teamTextDelay}s`
    };

    const statStyles = {
        backgroundColor: mainColors.statBgColor,
        transition: `width ${bgTranistion}s ease-in ${statBgDelay}s`
    };

    const statNameStyles = {
        color: mainColors.statTextColor,
        transition: `opacity ${textTransition}s ease-in ${statTextDelay}s`
    };

    const statValueStyles = {
        color: mainColors.statValueColor,
        transition: `opacity ${textTransition}s ease-in ${statTextDelay}s`
    };

    return (
        <div className="team-stat">
            <div className={`team ${hideClass}`} style={teamStyles}>
                <div className={`team-logo ${hideClass}`} style={teamLogoStyles}>
                    <img src={team.logo} height="35px" alt={team.name} />
                </div>
                <div className={`team-name ${hideClass}`} style={teamNameStyles}>{team.name}</div>
            </div>
            <div className={`stat ${hideClass}`} style={statStyles}>
                <div className={`stat-name ${hideClass}`} style={statNameStyles}>{teamStat.statName}</div>
                <div className={`stat-value ${hideClass}`} style={statValueStyles}>{teamStat.statValue}</div>
            </div>
        </div>
    );
}
