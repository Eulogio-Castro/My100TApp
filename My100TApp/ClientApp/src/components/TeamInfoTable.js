import React from 'react';
import { UncontrolledCarousel, Carousel, CarouselCaption, CarouselItem, CarouselControl, CarouselIndicators } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";


export class TeamInfoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            teamData: {}, loading: true, activeIndex:0, setActiveIndex:0, animating:false,setAnimating:false
        };



    }

    componentDidMount() {
        this.populateTeamData();

    }



    static renderTeamInfoTable(_teams) {

        return (
            <div className="d-flex justify-content-around flex-wrap">
                {_teams.teams[0].players.map(player =>
                    <div className="d-inline-flex">
                    <div className="card">
                            <img src={player.image} className="card-img-top rosterImageCell" width="40%" />
                        <div className="card-body">
                            <h5 className="card-title">{player.summonerName}</h5>
                            <p className="playerName">{player.firstName} {player.lastName}</p>
                            <p className="playerRole">{player.role.toUpperCase()}</p>
                        </div>
                        </div>
                        </div>
                    )}
                    </div>

        );

    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TeamInfoTable.renderTeamInfoTable(this.state.teamData);

        let teamLogo = this.state.loading
            ? <h1 id="tabelLabel drkBgdThieves" >100 Thieves Roster</h1>
            : <div className='center rosterHero'>
                <img src={this.state.teamData.teams[0].image} width="40%" />
                <br />
                <span>{this.state.teamData.teams[0].homeLeague.name} - {this.state.teamData.teams[0].homeLeague.region}</span>
            </div>



        return (
            <div>
                {teamLogo}
                {contents}
            </div>
        );
    }

    async populateTeamData() {

		const options = {
			method: 'GET',
			headers: {
				Accept: '*/*',
				'Accept-Language': 'en-US,en;q=0.5',
				'Accept-Encoding': 'gzip, deflate, br',
				Referer: 'https://lolesports.com/',
				'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z',
				Origin: 'https://lolesports.com',
				Connection: 'keep-alive',
				'Sec-Fetch-Dest': 'empty',
				'Sec-Fetch-Mode': 'cors',
				'Sec-Fetch-Site': 'same-site'
			}
		};

        const response = await fetch('https://esports-api.lolesports.com/persisted/gw/getTeams?hl=en-US&id=100-thieves', options)
        const data = await response.json();
        this.setState({ teamData: data.data, loading: false, activeIndex: 0, setActiveIndex: 0, animating: false, setAnimating: false });
    }

}