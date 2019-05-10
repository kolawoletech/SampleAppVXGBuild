import * as types from './actionTypes';

export const PlayVideo = uri => dispatch => {
    dispatch(play(uri));
    //console.log("Load From Actions "+ uri )

};

export const Stop = index => dispatch => {
    dispatch(stop(index));

};


export const FetchVideos = (videos) => dispatch => {
    dispatch(fetchVideos(videos));
};


export const play = uri => ({
    type: types.PLAY,
    uri: uri
});

export const stop = video => ({
    type: types.STOP,
    video: video
});

export const fetchVideos = videos => ({
    type: types.FETCH_VIDEOS,
    videos: videos
});
