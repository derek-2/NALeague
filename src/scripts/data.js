import GoldDiff from "./goldDiff";
import GoldShare from "./goldShare";
import MatchInfo from "./matchInfo";
class Data {
  constructor(team1, team2){
    console.log('hello');
    this.team1 = team1;
    this.team2 = team2;
    this.generateData(team1, team2);
  }

  async generateData(team1, team2){
    let games=[]; // can delete this after project done
    // general info on the match
    
    // stats of the match
    // let goldDiffy = [];

    // let matchInfo = [];
    let blueWins = 0;
    let redWins = 0;
    let playerGolds = [];
    let playerNames = []; // blue players, red players
    let championNames = []; // blue champions, red champions
    let bans = [];

    await d3.csv('../../data/LeagueofLegends.csv', function(d){
      if (d.blueTeamTag === team1 && d.redTeamTag === team2){
        // debugger;
        games.push(d);

        // matchInfo.push([d.League, d.Year, d.Season, d.Type]);
        // debugger;
        if (parseInt(d.bResult) === 1){
          blueWins+=1;
        }
        else {
          redWins+=1;
        }


        // get player golds of both teams at the end of the game
        let idx = JSON.parse(d.goldblueTop).length-1; // gets the idx for last minute of the game

        let blueGold = [];
        let redGold = [];

        blueGold.push(JSON.parse(d.goldblueTop)[idx]);
        blueGold.push(JSON.parse(d.goldblueJungle)[idx]);
        blueGold.push(JSON.parse(d.goldblueMiddle)[idx]);
        blueGold.push(JSON.parse(d.goldblueADC)[idx]);
        blueGold.push(JSON.parse(d.goldblueSupport)[idx]);

        redGold.push(JSON.parse(d.goldredTop)[idx]);
        redGold.push(JSON.parse(d.goldredJungle)[idx]);
        redGold.push(JSON.parse(d.goldredMiddle)[idx]);
        redGold.push(JSON.parse(d.goldredADC)[idx]);
        redGold.push(JSON.parse(d.goldredSupport)[idx]);

        playerGolds.push(blueGold.concat(redGold));

        // get player names of both teams
        playerNames.push([d.blueTop, d.blueJungle, d.blueMiddle, d.blueADC, d.blueSupport,d.redTop, d.redJungle, d.redMiddle, d.redADC, d.redSupport]);

        // get champion names of both teams
        championNames.push([d.blueTopChamp, d.blueJungleChamp, d.blueMiddleChamp, d.blueADCChamp, d.blueSupportChamp,d.redTopChamp, d.redJungleChamp, d.redMiddleChamp, d.redADCChamp, d.redSupportChamp]);

        // get bans of both teams, could have just used JSON.parse
        // debugger;
        let currentblueBans = d.blueBans.slice(1,d.blueBans.length-1).replaceAll("'","").split(",");
        currentblueBans = currentblueBans.map(ban => ban.trim());
        let currentredBans = d.redBans.slice(1,d.redBans.length-1).replaceAll("'","").split(",");
        currentredBans = currentredBans.map(ban => ban.trim());
        // debugger;
        bans.push(currentblueBans.concat(currentredBans));
        


      }
    });
    let headtohead = document.getElementById('overall-record');
    headtohead.innerHTML = `${team1} ${blueWins} - ${redWins} ${team2}`;
    // debugger;
    let statsdiv = document.getElementById('stats');
    // debugger;

    for( let i = 0; i < playerNames.length; i++){
      let gameInfo = document.createElement('div');
      gameInfo.setAttribute('id',`game-${i}`);
      gameInfo.setAttribute('class','game-info');
      statsdiv.append(gameInfo);
      // debugger;

      
      // debugger;

      let bluePlayers = document.createElement('div');
      let blueteamLabel = document.createElement('h2');
      blueteamLabel.innerText = `${team1}`;
      bluePlayers.setAttribute('id', `blueteam${i}`);
      bluePlayers.setAttribute('class', 'players-container');
      bluePlayers.append(blueteamLabel);
      
      let redPlayers = document.createElement('div');
      let redteamLabel = document.createElement('h2');
      redteamLabel.innerText = `${team2}`;
      redPlayers.setAttribute('id', `redteam${i}`);
      redPlayers.setAttribute('class', 'players-container red');
      redPlayers.append(redteamLabel);

      gameInfo.append(bluePlayers);
      gameInfo.append(redPlayers);



      let blueattach = document.getElementById(`blueteam${i}`);
      let redattach = document.getElementById(`redteam${i}`);
      let bluesBans = document.createElement('p');
      let redsBans = document.createElement('p');
      // debugger;
      blueattach.append(bluesBans);
      redattach.append(redsBans);


      let mid = bans[i].length/2;
      let allBluesBans = [];
      let allRedsBans = [];
      debugger;
      for (let c = 0; c < mid; c++){
        debugger;
        allBluesBans.push(bans[i][c]);
      }
      for (let c = mid; c < mid*2; c++){
        debugger;
        allRedsBans.push(bans[i][c]);
      }

      bluesBans.innerHTML = allBluesBans.join(" ");
      redsBans.innerHTML = allRedsBans.join(" ");
      // debugger;


      let newMatchInfo = new MatchInfo(i, team1, team2);
      let newGoldDiff = new GoldDiff(i,team1, team2);
      let newGoldShare = new GoldShare(i, playerNames[i], playerGolds[i]);

      for(let j=0; j< playerNames[i].length; j++){
        if (j < 5){
          let player = document.createElement('p');
          // debugger;
          player.innerHTML = `${playerNames[i][j]} (${championNames[i][j]}) ${playerGolds[i][j]}`;
          bluePlayers.append(player);
        }
        else {
          let player = document.createElement('p');
          player.innerHTML = `${playerNames[i][j]} (${championNames[i][j]}) ${playerGolds[i][j]}`;
          redPlayers.append(player);
        }
      }


      
    }
  
    // debugger;
  } // end of async function







} // ending curly brace for class

// export Data class
export default Data;