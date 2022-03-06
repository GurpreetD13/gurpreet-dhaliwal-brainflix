import './Home.scss'
import React from 'react';
import VideoHero from '../../components/VideoHero/VideoHero';
import VideoDetails from '../../components/VideoDetails/VideoDetails';
import VideoList from '../../components/VideoList/VideoList';
import apiUtils from '../../utils/apiUtils';
//     apiUtils file contains reusable API request functions to GET All videos array and Single video details object



class Home extends React.Component {

    // Set Initial State to be Empty for both data sets (videoList and activeVideo) 
    // and render Loading... (see if statement in render) until we GET data from API in componentDidMount
    state = {
        activeVideo: null,
        videosData: []
    };

    componentDidMount() {
        // First GET array/list of All videos from API and set it to state
        apiUtils.getAllVideosArray()
            .then(response => {

                this.setState({
                    videosData: response.data
                });
                // Then GET single video details object from API of either the:  
                // - 1st video in videosData array above, by using the id of the video at index 0, OR the 
                // - video in the URL path (by using/accessing the videoId from URLs match.params)
                const videoId = this.props.match.params.videoId || response.data[0].id;

                apiUtils.getSingleVideoDetails(videoId)
                    .then(response => {
                        // and Set initial loaded/Mounted State of activeVideo to that video
                        this.setState({
                            activeVideo: response.data,
                        });
                    }).catch(error => console.log(error));
            }).catch(error => console.log(error));
    };


    componentDidUpdate(prevProps) {
        // Set up condition to Update state (activeVideo) only 
        // IF the new URL path is different than the previous, to prevent infinite loop in componentDidUpdate

        const videoId = this.props.match.params.videoId;
        const prevVideoId = prevProps.match.params.videoId;

        if (videoId !== prevVideoId) {
            // otherwise Update state of activeVideo to the video in the URL path
            apiUtils.getSingleVideoDetails(videoId)
                .then(response => {

                    this.setState({
                        activeVideo: response.data,
                    });
                }).catch(error => console.log(error));
        };
    };

    render() {
        if (!this.state.activeVideo) {
            return (<h2>Loading...</h2>);
        };
        // Fitler out the active video from videosData array before passing into VideoList component by using active video's id
        const filteredVideos = this.state.videosData.filter(video => video.id !== this.state.activeVideo.id)

        return (
            <>
                <VideoHero
                    activeVideo={this.state.activeVideo} />

                <div className='desktop-container'>
                    <VideoDetails
                        activeVideo={this.state.activeVideo} />

                    <VideoList
                        filteredVideos={filteredVideos} />
                </div>
            </>
        );
    }
}

export default Home;