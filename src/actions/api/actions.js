
import * as types from './actionTypes';

export const registerUser = () => dispatch => {
    dispatch(apiUserRegistering());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {
            dispatch(apiUserRegistered(token_data["data"]));
            const channels_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };
            const channel_url = 'https://nile.rtst.co.za/api/artist/6/channels';

            fetch(channel_url, channels_options)
                .then(channels => channels.json())
                .then(channels => {
                    let chans = channels["data"]
                    
                    dispatch(channelsLoaded(chans))
                })


            
        })

        //.catch(err => console.log("An error occured", err))
}

export const fetchChannels = () => dispatch => {
    dispatch(fetchingChannels());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {
            dispatch(apiUserRegistered(token_data["data"]));

            const channels_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };
            const channel_url = 'https://nile.rtst.co.za/api/artist/6/channels/';

            fetch(channel_url, channels_options)
                .then(channels => channels.json())
                .then(channels => {
                    let chans = channels["data"]
                    dispatch(channelsLoaded(chans))
                })
        })
       // .catch(err => console.log("An error occured", err))
}



export const fetchChannelObject = (id) => dispatch => {
    dispatch(apiUserRegistering());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {

            dispatch(apiUserRegistered(token_data["data"]));
            //console.log("This is TOKEN from STORE "+ token_data["data"]);
            const channels_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };

            //dispatch(channelLoading(id))
            //console.log("ID USED IN STORE IS "  + id)
            const channel_url = 'https://nile.rtst.co.za/api/artist/6/channels/' + id + '/';

            fetch(channel_url, channels_options)
                .then(channel => channel.json())
                .then(channel => {
                    let chan = channel["data"]
                    //console.log(chan);
                    dispatch(channelLoaded(chan));
                    //dispatch(programUriLinkObjectCreated(chan))
                })
        })

        //.catch(err => console.log("An error occured", err))
}

export const fetchProgramImage = (id) => dispatch => {
    dispatch(apiUserRegistering());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {

            dispatch(apiUserRegistered(token_data["data"]));
            //console.log("This is TOKEN from STORE "+ token_data["data"]);
            const channels_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };

            
            const channel_url = 'https://nile.rtst.co.za/api/artist/6/programs/' + id + '/' + 'icon/';

            fetch(channel_url, channels_options)
                .then(icon => icon.json())
                .then(icon => {
                    let img= icon["data"]
                    dispatch(imageLoaded(img)); 

                 
                })
        })

        //.catch(err => console.log("An error occured", err))
}

export const fetchChannelImage = (id) => dispatch => {
    dispatch(apiUserRegistering());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {

            dispatch(apiUserRegistered(token_data["data"]));
            //console.log("This is TOKEN from STORE "+ token_data["data"]);
            const channels_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };

            
            const channel_url = 'https://nile.rtst.co.za/api/artist/6/channels/' + id + '/' + 'icon/';

            fetch(channel_url, channels_options)
                .then(icon => icon.json())
                .then(icon => {
                    let img= icon["data"]
                    dispatch(imageLoaded(img)); 

                 
                })
        })

       // .catch(err => console.log("An error occured", err))
}



export const fetchProgramURILinks = (id, profile_id) => dispatch => {

    dispatch(apiUserRegistering());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {

            dispatch(apiUserRegistered(token_data["data"]));
            //console.log("This is TOKEN from STORE "+ token_data["data"]);
            const programs_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };

            //dispatch(channelLoading(id))
            //console.log("ID USED IN STORE IS "  + id)
            const program_url = 'https://nile.rtst.co.za/api/artist/6/programs/' + id + '/uri/' + profile_id + '/';

            fetch(program_url, programs_options)
                .then(uri=> uri.json())
                .then(uri => {
                    let link = uri["data"]
                   // console.log("..............Getting HERE .............")
                    //console.log(link);
                    dispatch(programUriLinkLoaded(link));
                    
                })
        })

       // .catch(err => console.log("An error occured", err))
}



export const fetchCatalogue = () => dispatch => {
    dispatch(apiUserRegistering());

    const options = {
        method: 'POST',
        body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    const url = 'https://nile.rtst.co.za/api/artist/6/tokens';
    fetch(url, options)
        .then(token_data => token_data.json())
        .then(token_data => {
            dispatch(apiUserRegistered(token_data["data"]));

            const programs_options = {
                method: 'GET',

                headers: new Headers({
                    'Authorization': 'Bearer ' + token_data["data"],
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            };
            const programs_url = 'https://nile.rtst.co.za/api/artist/6/programs';

            fetch(programs_url, programs_options)
                .then(programs => programs.json())
                .then(programs => {
                    let progs = programs["data"]
                    dispatch(catalogueLoaded(progs))
                 
                })
        })
       //. .catch(err => console.log("An error occured", err))
}

const apiUserRegistering = () => ({
    type: types.REGISTERING_USER,

});

const apiUserRegistered = (token) => ({
    type: types.REGISTERED_USER,
    token
});

const apiUserRegister = () => ({
    type: types.REGISTER_USER,


});

const channelsLoaded = (channels) => ({
    type: types.CHANNELS_LOADED,
    channels
});

const channelLoaded = (channel) => ({
    type: types.FETCHED_CHANNEL,
    channel
});


const imageLoaded = (img) => ({
    type: types.CHANNEL_IMAGE_URI_LOADED,
    img
});
const channelLoading = () => ({
    type: types.FETCHING_CHANNEL,
});

const programLoaded = (channel) => ({
    type: types.FETCHED_CHANNEL,
    channel
});



const catalogueLoaded = (catalogue) => ({
    type: types.CATALOGUE_LOADED,
    catalogue
});


const programUriLinkLoaded= (link) => ({
    type: types.CATALOGUE_URI_LINK_LOADED,
    link
});

const programUriLinkObjectCreated= () => ({
    type: types.CATALOGUE_URI_LINK_OBJECT_CREATED,
    link
});