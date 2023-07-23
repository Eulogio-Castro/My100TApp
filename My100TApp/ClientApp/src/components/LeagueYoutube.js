import React from 'react';
import { UncontrolledCarousel, Carousel, CarouselCaption, CarouselItem, CarouselControl, CarouselIndicators } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import YoutubeEmbed from "./YoutubeEmbed";
import App from '../App';


export class LeagueYoutube extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            channelData: [], uploadsData: [], channelloading: true, uploadsloading: true
        };



    }

    componentDidMount() {
        this.populateChannelData();
        this.populateUploadsData();

    }



    static renderUploadsInfo(_uploadsData) {

        

        return (
            <div className="container" style={{ width: "75%" }}>
                {_uploadsData.items.map(upload =>
                        <div className="ytcard">
{/*                            <a href="https://www.youtube.com/watch?v={upload.id.videoId}" target="_blank" rel="noreferrer"><img src={upload.snippet.thumbnails.medium.url} className="card-img-top rosterImageCell" width="120%" /></a>*/}
                            <YoutubeEmbed embedId={upload.contentDetails.videoId}/>

                        </div>
                )}
            </div>

        );

    }


    render() {
        let uploads = this.state.uploadsloading
            ? <p><em>Loading...</em></p>
            : LeagueYoutube.renderUploadsInfo(this.state.uploadsData);

        let channelInfo = this.state.channelloading
            ? <h1 id="tabelLabel drkBgdThieves" >100 Thieves League of Legends YT</h1>
            : <div className='center'>
                <img src={this.state.channelData.items[0].snippet.thumbnails.high.url}
                    style={{
                        objectFit: "fill",
                        width: "15%",
                        paddingTop: "15px"
                    }} />
            </div>



        return (
            <div >
                {channelInfo}
                {uploads}
            </div>
        );
    }

    async populateChannelData() {

        const options = { method: 'GET', headers: { Accept: 'application/json' } };

        const profileRequest = "https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCUerxSaXO_vYnwXdMoObmlQ&key=" + process.env.REACT_APP_GOOGLE_API_KEY
        const response = await fetch(profileRequest, options)
        const data = await response.json();
        //this.setState({ teamData: data.data, loading: false });

        this.setState({ channelData: data, channelloading: false});
    }

    async populateUploadsData() {

        const options = {
            method: 'GET',
            headers: { Accept: 'application/json' }
        };
        const playlistRequest = "https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=10&playlistId=UULFUerxSaXO_vYnwXdMoObmlQ&key=" + process.env.REACT_APP_GOOGLE_API_KEY
        const response = await fetch(playlistRequest, options)
        const data = await response.json();
        //this.setState({ teamData: data.data, loading: false });

        this.setState({ uploadsData: data, uploadsloading: false });
    }

}