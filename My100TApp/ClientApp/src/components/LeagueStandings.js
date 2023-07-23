import React, { Component } from 'react';
export class LeagueStandings extends Component {

    constructor(props) {
        super(props);
        this.state = { standingsData: {}, loading: true };

    }

    componentDidMount() {
        this.populateLeagueStandings();
    }

    static renderLeagueStandings(_standings) {
        return (

            <table>

                <thead style={{ backgroundColor: "transparent" }}>
                    <tr>
                        <th className='center underline'>Place</th>
                        <th className='center underline'>Team</th>
                        <th className='center underline'>Win / Loss</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        _standings.standings[0].stages[0].sections[0].rankings.map(rank =>
                            rank.teams.map(teams =>
                                <tr style={{ backgroundColor: "transparent", borderBottom:"1px solid white" }}>
                                    <td className='textSize36 center whiteText' width='15%'>{rank.ordinal}</td>
                                    <td className='justify-content-around flex-wrap' style={{ textAlign: 'left', fontSize:'2rem' }} width='40%'><img src={teams.image} width='30%' style={{ paddingRight: 50 }} /> {teams.name} </td>
                                    <td className='textSize36 center whiteText' width='15%'>{teams.record.wins} - {teams.record.losses}</td>
                                </tr>
                            )
                        )
                    }
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : LeagueStandings.renderLeagueStandings(this.state.standingsData);


        return (
            <div className='whiteText center'>
                <h1 style={{ paddingBottom: "25px" }}><img src="./Images/lcslogosmall.png"/> LCS Standings</h1>
                {contents}
            </div>
        );
    }

    async populateLeagueStandings() {

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
                'Sec-Fetch-Site': 'same-site',
                TE: 'trailers'
            }
        };

        //const response = await fetch('https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=109517090066605615', options)
        const response = await fetch('https://esports-api.lolesports.com/persisted/gw/getStandings?hl=en-US&tournamentId=110303581083678395', options)

        const data = await response.json();
        this.setState({ standingsData: data.data, loading: false });
    }

}