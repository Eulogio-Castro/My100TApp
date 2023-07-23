import React, { Component } from 'react';
import _, { forEach } from 'lodash';
export class TeamSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = { scheduleData: {}, loading: true };

    }

    componentDidMount() {
        this.populateScheduleData();
    }

    static renderSchedule(_schedule) {

        let matchesByWeek = _.groupBy(_schedule.events, "blockName");
        var weeksObject = {
            weekArray: []
        };

        for (var i in matchesByWeek) {

            var item = matchesByWeek[i];
            weeksObject.weekArray.push({
                "events": item,
                "blockName": item[0].blockName
            });
        }


        return (
            <table className='table' aria-labelledby="tableLabel">
                <thead>
                    <tr style={{ backgroundColor: "transparent"}}>
                        <th className='center'>Week</th>
                        <th className='center'>
                            <div style={{ display: "flex", justifyContent: "space-between", marginInline: "5%" }}>
                                <div style={{}}>Match Date </div>
                                <div style={{ marginRight: "5%" }}>Team 1 </div>
                                <div style={{ marginRight: "7%" }}> Map Count</div>
                                <div style={{ marginRight:"5%" }}> Team 2</div>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        weeksObject.weekArray.reverse().map(week =>
                            <tr key={week.blockName} style={{ backgroundColor: "transparent"}}>
                                <td width='25%' className='textSize36 whiteText' style={{ textAlign: "center" }}>{week.blockName}</td>

                                <td>
                                    <table className="vodTable" aria-labelledby="tableLabel">
                                        <tbody>
                                            {week.events.reverse().map(event =>
                                                event.match.teams[0].name === "100 Thieves" || event.match.teams[1].name === "100 Thieves" ?
                                                    <tr key={event.match.id} style={{ backgroundColor: "transparent" }}>

                                                        <td width='15%' style={{ color: "white", lineHeight: "100%", fontSize: ".8em", paddingRight: "20px" }}> {new Date(event.startTime).toLocaleDateString()}</td>
                                                        <td width='25%' className='whiteText center ' style={{ lineHeight: "100%"}} ><img src={event.match.teams[0].image} width="20%" /><br /> {event.match.teams[0].name}</td>
                                                        <td className='textSize36 center whiteText' width='20%'> {event.match.teams[0].result.gameWins}   -   {event.match.teams[1].result.gameWins}<br /><br /><br />
                                                            <a href={`https://www.youtube.com/watch?v=${event.games[0].vods[0].parameter}`}>
                                                                <button className="VODLinkButton">View Match</button>
                                                            </a>                            </td>
                                                        <td width='25%' className='whiteText center' style={{ lineHeight: "100%" }}><img src={event.match.teams[1].image} width="20%" style={{ paddingBottom:"10px" }} /><br /> {event.match.teams[1].name}</td>
                                                    </tr>
                                                    : null

                                            )}
                                        </tbody>
                                    </table>
                                </td>

                            </tr>
                        )
                    }

                </tbody>
            </table >
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : TeamSchedule.renderSchedule(this.state.scheduleData);


        return (
            <div>
                {contents}
            </div>
        );
    }

    async populateScheduleData() {

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

        const response = await fetch('https://esports-api.lolesports.com/persisted/gw/getVods?hl=en-US&tournamentId=110303581083678395', options)
        const data = await response.json();
        this.setState({ scheduleData: data.data.schedule, loading: false });
    }

}