import './Home.scss'
import React from 'react';
import VideoHero from '../../components/VideoHero/VideoHero';
import VideoDetails from '../../components/VideoDetails/VideoDetails';
import VideoList from '../../components/VideoList/VideoList';

// remove harcoded data
import videosData from '../../data/videos.json';
import videoDetailsData from '../../data/video-details.json';


class Home extends React.Component {

  // Set initial default State to the 1st video in the videoDetailsData array, along with the smaller videosData
  state = {
    activeVideo: videoDetailsData[0],
    videosData: videosData
  }

  // Function handleVideoChange will handle change/set State of active video to the clicked video from VideoList component.
  // It uses the clicked video's id from the videosData array in VideoList component and 
  // finds the same video in the videoDetailsData array, by using id, because the id of the videos is the same in
  // both sets of data

  handleVideoChange = (clickedVideoId) => {
    const clickedVideo = videoDetailsData.find(video => video.id === clickedVideoId)

    this.setState({
      activeVideo: clickedVideo
    })
  }

  render() {
    // Fitler out the active video from videosData array before passing into VideoList component by using active video's id
    const filteredVideos = videosData.filter(video => video.id !== this.state.activeVideo.id)

    return (
      <>
        <VideoHero
          activeVideo={this.state.activeVideo} />

        <div className='desktop-container'>
          <VideoDetails
            activeVideo={this.state.activeVideo} />

          <VideoList
            filteredVideos={filteredVideos}
            handleVideoChange={this.handleVideoChange} />
        </div>
      </>
    );
  }
}

export default Home;