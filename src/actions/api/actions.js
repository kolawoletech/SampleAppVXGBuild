import * as types from "./actionTypes";
import RNFS from "react-native-fs";
import { Alert } from "react-native";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { AsyncStorage } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import fetch from 'react-native-fetch-polyfill';
var data = require('./data.json');

AsyncStorage.getItem("aid").then(AID => {
  const appID = AID;
});

export const newRegisterUser = (aid, tokenID) => dispatch => {
  const channel_url = "https://nile.rtst.co.za/api/artist/6/channels";

  const channels_options = {
    method: "GET",

    headers: new Headers({
      Authorization: "Bearer " + tokenID,
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };

  fetch(channel_url, channels_options)
    .then(channels => channels.json())
    .then(channels => {
      let chans = channels["data"];

      dispatch(channelsLoaded(chans));
    });
};

export const registerUser = () => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));
      const channels_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };
      const channel_url = "https://nile.rtst.co.za/api/artist/6/channels";

      fetch(channel_url, channels_options)
        .then(channels => channels.json())
        .then(channels => {
          let chans = channels["data"];

          dispatch(channelsLoaded(chans));
        });
    });

  //.catch(err => console.log("An error occured", err))
};

export const switchQuality = (id, action) => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  console.log("From the Switch Action Block: " + id)

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));
      const channels_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      const channel_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/switch";

      var config = {
        headers: { Authorization: "Bearer " + token_data["data"] }
      };

      axios
        .post(channel_url, action, config)
        .then(function(response) {
          console.log("Axios Response: " + JSON.stringify(response["data"]));
        })
        .catch(function(error) {
          console.log("Axios Error: " + error);
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });
    });

  //.catch(err => console.log("An error occured", err))
};

export const fetchChannels = () => dispatch => {
  dispatch(fetchingChannels());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));

      const channels_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };
      const channel_url = "https://nile.rtst.co.za/api/artist/6/channels/";

      fetch(channel_url, channels_options)
        .then(channels => channels.json())
        .then(channels => {
          let chans = channels["data"];
          dispatch(channelsLoaded(chans));
        });
    });
  // .catch(err => console.log("An error occured", err))
};

export const fetchCategories = () => dispatch => {
  //TODO 
  dispatch(categoriesLoading());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));

      const catgories_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };
      const categories_url = "https://nile.rtst.co.za/api/artist/6/categories/";

      fetch(categories_url, catgories_options)
        .then(categories => categories.json())
        .then(categories => {
          let cats =categories["data"];
          console.log("Getting Categories" + cats)
          dispatch(categoriesLoaded(cats));
        });
    });
  // .catch(err => console.log("An error occured", err))
};



export const fetchCategoryItems = (cat) => dispatch => {
  //TODO 
  dispatch(categoryItemsLoading());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));

      const catgories_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      console.log("Start Geting Category Items")
      const categories_url = "https://nile.rtst.co.za/api/artist/6/categories/";
      const categories_search_url ="https://nile.rtst.co.za/api/artist/6/programs?";

      fetch(categories_search_url , catgories_options)
        .then(categories => categories.json())
        .then(categories => {
          let cats =categories["data"];

          dispatch(categoryItemsLoaded(cats, cat));
         // dispatch(currentCategoryType(cat))

        });
    });
};

export const sendCategoryMetadata = (cat) => dispatch => {
  //TODO 
  //dispatch(categoryItemsLoading());


  dispatch(currentCategoryType(cat))

};

export const sendMessage = (id, opts, aid) => dispatch => {
  console.log("This is  a numnber d" + id)
  dispatch(apiUserRegistering());
  var integer = parseInt(id);
  console.log(integer)


  const options = {
    method: "POST",
    body: "aid=" + aid,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded", 
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));

      console.log("After Stringify " + JSON.stringify(opts));

      const channel_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/messages/";


      var config = {
        headers: { 'Authorization': "Bearer " + token_data["data"] ,  "Content-Type": "application/x-www-form-urlencoded"}
      };

      const optionsSend = {
        method: "POST",
        body:  JSON.stringify(opts),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token_data["data"]
        }
      };

      console.log("In the Body" + optionsSend.body)

      fetch(channel_url, optionsSend)
  
      .then(res => {
        console.log("Using another Method" + JSON.stringify(res))

      }) .catch(function(error) {
        console.log("Fetchs Error: " + error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
    
    });

  //.catch(err => console.log("An error occured", err))
};

export const fetchChannelObject = (id, aid, tokenID) => dispatch => {
  dispatch(apiUserRegistering());

  const channel_url =
    "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/";

  const channels_options = {
    method: "GET",

    headers: new Headers({
      Authorization: "Bearer " + tokenID,
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };

  fetch(channel_url, channels_options)
    .then(channel => channel.json())
    .then(channel => {
      let chan = channel["data"];
      dispatch(channelLoaded(chan));
    });
};

export const fetchProgramImage = (id, aid, token) => dispatch => {
  dispatch(apiUserRegistering());

  dispatch(apiUserRegistered(token));
  console.log("This is TOKEN from STORE " + token);
  const channels_options = {
    method: "GET",

    headers: new Headers({
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };

  const channel_url =
    "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/" + "icon/";

  fetch(channel_url, channels_options)
    .then(icon => icon.json())
    .then(icon => {
      let img = icon["data"];
      dispatch(imageLoaded(img));
    });
};

export const fetchChannelImage = (id, aid) => dispatch => {
  dispatch(apiUserRegistering());

  console.log("Using AID");
  const options = {
    method: "POST",
    body: "aid=" + aid,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));
      //console.log("This is TOKEN from STORE "+ token_data["data"]);
      const channels_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      const channel_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/" + "icon/";

      fetch(channel_url, channels_options)
        .then(icon => icon.json())
        .then(icon => {
          let img = icon["data"];
          dispatch(imageLoaded(img));
        });
    });

  // .catch(err => console.log("An error occured", err))
};

export const fetchChannelGuide = id => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));
      //console.log("This is TOKEN from STORE "+ token_data["data"]);
      const channels_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      const channel_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" +
        id +
        "/" +
        "schedule/";

      fetch(channel_url, channels_options)
        .then(guidelist => guidelist.json())
        .then(guidelist => {
          console.log(guide);
          let guide = guidelist["data"];
          //console.log("WE AT HERE: " + JSON.stringify(guide))
          dispatch(guideLoaded(guide));
        });
    })

    .catch(err => console.log("An error occured", err));
};

export const fetchChannelChats = (id, AID, TOKEN) => dispatch => {
  //dispatch(apiUserRegistering());


  //console.log(data)
  //dispatch(messagesLoaded(data));

  const messages_url ="https://nile.rtst.co.za/api/artist/6/channels/" .concat(id)+ "/messages";
  const AuthStr = 'Bearer '.concat(TOKEN); 
  console.log(id + "IS THIS WORKING" , messages_url + " AND ~THIS TokenL " + AuthStr)


  axios.get(messages_url,  { headers : { "Authorization":  AuthStr ,  "If-None-Match": null }}).then((response)=>{
    let chatStream = response.data;
    dispatch(messagesLoaded(chatStream.data));
  })

  .catch(err=>{
    console.log(err)
  })



};

export const fetchProgramURILinks = (
  id,
  profile_id,
  aid,
  tokenID
) => dispatch => {
  dispatch(apiUserRegistering());
  console.log("Program Links:  " + aid);
  dispatch(apiUserRegistered(tokenID));
  //console.log("This is TOKEN from STORE "+ token_data["data"]);
  const programs_options = {
    method: "GET",

    headers: new Headers({
      Authorization: "Bearer " + tokenID,
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };

  //dispatch(channelLoading(id))
  //console.log("ID USED IN STORE IS "  + id)
  const program_url =
    "https://nile.rtst.co.za/api/artist/6/programs/" +
    id +
    "/uri/" +
    profile_id +
    "/";

  fetch(program_url, programs_options)
    .then(uri => uri.json())
    .then(uri => {
      let link = uri["data"];

      dispatch(programUriLinkLoaded(link));




      downloadVideo = async (name, url) => {
        console.log(url);

        NetInfo.getConnectionInfo().then(data => {
          console.log("Connection type", data.type);

          console.log("Connection effective type", data.effectiveType);

          AsyncStorage.getItem("wifiBoolValue").then(result => {
            console.log("Log the result here : " + result);

            if (result === "true" && data.type !== "wifi") {
              console.log(result + "" + data.type);
              Alert.alert(
                "No WIFI Connection",
                "[If you wish to download over your mobile network then the WI-FI only settings in the settings menu must be switched off]"
              );
            } else {
              this.createDirectory();
            }
          });
        });

        const destPath =
          RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name+ '.mp4';

        console.log("Here I am");
        let option = {
          fromUrl: url,
          toFile: destPath
        };

        const FILE_LOCATION =
          RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name+ '.mp4';

        RNFS.exists(FILE_LOCATION).then(exists => {
          console.log(exists);
          if (exists) {
            console.log("File Already Exist");
            Alert.alert(
              "Program Already Exists In Playlist",
              "Delete First",
              [
                
                {
                  text: "Dismiss",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }
              ],
              { cancelable: false }
            );
          } else {
            RNFS.downloadFile(option).promise.then(res => {
              console.log("res -----------------------------> ", res);
            });

            Alert.alert("Download Started", "Check Playlist When Done");
          }
        });
      };

      continueDownload = url => {
        console.log(url);
        const destPath =
          RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name + '.mp4';

        let option = {
          fromUrl: url,
          toFile: destPath
        };

        console.log("continuing download");
        RNFS.downloadFile(option).promise.then(res => {
          console.log("res -----------------------------> ", res);
        });

        Alert.alert("Download Started", "Check Playlist When Done");
      };

      createDirectory = () => {
        console.log(" Created Folder and Download Running");

        key = {
          NSURLIsExcludedFromBackupKey: true
        };

        const VIDE0_FOLDER = RNFS.DocumentDirectoryPath + "/NileMediaVideos/";

        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/NileMediaVideos/", key);
      };

      this.downloadVideo(id, link);
    });

  // .catch(err => console.log("An error occured", err))
  //TODO Play High Still has channelID
};


export const fetchAudioURILinks = (
  id,
  profile_id,
  aid,
  tokenID
) => dispatch => {
  dispatch(apiUserRegistering());
  console.log("Program Links:  " + aid);
  dispatch(apiUserRegistered(tokenID));
  //console.log("This is TOKEN from STORE "+ token_data["data"]);
  const programs_options = {
    method: "GET",

    headers: new Headers({
      Authorization: "Bearer " + tokenID,
      "Content-Type": "application/x-www-form-urlencoded"
    })
  };

  //dispatch(channelLoading(id))
  //console.log("ID USED IN STORE IS "  + id)
  const program_url =
    "https://nile.rtst.co.za/api/artist/6/programs/" +
    id +
    "/uri/" +
    profile_id +
    "/";

  fetch(program_url, programs_options)
    .then(uri => uri.json())
    .then(uri => {
      let link = uri["data"];

      dispatch(programUriLinkLoaded(link));




      downloadVideo = async (name, url) => {
        console.log(url);

        NetInfo.getConnectionInfo().then(data => {
          console.log("Connection type", data.type);

          console.log("Connection effective type", data.effectiveType);

          AsyncStorage.getItem("wifiBoolValue").then(result => {
            console.log("Log the result here : " + result);

            if (result === "true" && data.type !== "wifi") {
              console.log(result + "" + data.type);
              Alert.alert(
                "No WIFI Connection",
                "[If you wish to download over your mobile network then the WI-FI only settings in the settings menu must be switched off]"
              );
            } else {
              this.createDirectory();
            }
          });
        });

        const destPath =
          RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name  + ".mp4";

        console.log("Here I am");
        let option = {
          fromUrl: url,
          toFile: destPath
        };

        const FILE_LOCATION =
          RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name  + ".mp4";

        RNFS.exists(FILE_LOCATION).then(exists => {
          console.log(exists);
          if (exists) {
            console.log("File Already Exist");
            Alert.alert(
              "Podcast Already Exists In Playlist",
              "Delete First",
              [
                {
                  text: "Dismiss",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                }
              ],
              { cancelable: true }
            );
          } else {
            RNFS.downloadFile(option).promise.then(res => {
              console.log("res -----------------------------> ", res);
            });

            Alert.alert("Download Started", "Check Playlist When Done");
          }
        });
      };

      continueDownload = url => {
        console.log(url);
        const destPath =
          RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name + ".mp4";

        let option = {
          fromUrl: url,
          toFile: destPath
        };

        console.log("continuing download");
        RNFS.downloadFile(option).promise.then(res => {
          console.log("res -----------------------------> ", res);
        });

        Alert.alert("Download Started", "Check Playlist When Done For Podcast");
      };

      createDirectory = () => {
        console.log(" Created Folder and Download Running For Podcast");

        key = {
          NSURLIsExcludedFromBackupKey: true
        };

        const VIDE0_FOLDER = RNFS.DocumentDirectoryPath + "/NileMediaVideos/";

        RNFS.mkdir(RNFS.DocumentDirectoryPath + "/NileMediaVideos/", key);
      };

      this.downloadVideo(id, link);
    });

  // .catch(err => console.log("An error occured", err))
  //TODO Play High Still has channelID
};

export const fetchChannelRSTPLinks = (
  id,
  profile_id,
  aid,
  quality
) => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid=" + aid,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";


  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));
      const programs_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      const program_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" +
        id +
        "/uri/" +
        profile_id +
        "/";

        console.log("This is the ID: From Switch " + id)

      fetch(program_url, programs_options)
        .then(uri => uri.json())
        .then(uri => {
          let link = uri["data"];
        
          dispatch(channelRstpLinkLoaded(link));
          //dispatch(streamLoadedType(quality))

          Actions.player({ link, qualityData: quality, id });
        });
    });
};

export const playHighRSTPStream = (id, profile_id ) => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));
      const programs_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };

      const program_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" +
        id +
        "/uri/" +
        profile_id +
        "/";

      fetch(program_url, programs_options)
        .then(uri => uri.json())
        .then(uri => {
          let link = uri["data"];

          dispatch(channelRstpLinkLoaded(link));
          Actions.player({ link, qualityData: "HIGH", id });
        });
    });
};

export const fetchMediaItemMetadata = id => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const url = "https://nile.rtst.co.za/api/artist/6/tokens";
  fetch(url, options)
    .then(token_data => token_data.json())
    .then(token_data => {
      dispatch(apiUserRegistered(token_data["data"]));

      const programs_options = {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
          "Content-Type": "application/x-www-form-urlencoded"
        })
      };
      const programs_url =
        "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/";

      fetch(programs_url, programs_options)
        .then(programs => programs.json())
        .then(programs => {
          let progs = programs["data"];
          dispatch(catalogueLoaded(progs));
        });
    });
};

export const fetchCatalogue = (aid, tokenID) => dispatch => {
  //dispatch(apiUserRegistering());

  dispatch(apiUserRegistered(tokenID));

  const programs_options = {
    'method': "GET",
    'headers': {
      'Authorization': "Bearer " + tokenID,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  const programs_url = "https://nile.rtst.co.za/api/artist/6/programs";
  fetch(programs_url, programs_options)
    .then(programs => programs.json())
    .then(programs => {
      let progs = programs["data"];
     
      //dispatch(catalogueLoaded(progs));

      dispatch(catalogueLoaded(progs));
    });
};

export const fetchChatStream = (token) => dispatch => {
  dispatch(apiUserRegistering());

  const messages_url =
  "https://nile.rtst.co.za/api/artist/6/channels/28/messages/";

  const optionsR = {
    timeout: 30 * 1000,
    method: "GET",
    'headers':{
      'Authorization': 'Bearer ' + token,
      "If-None-Match": null
    }
  };

  return axios.get(messages_url,optionsR).then((response)=>{
    console.log(response)
    console.log("Getting There")
  })

  .then(response=> {
    chatStream = response.data;
    console.log("WE AT HERE GETTING MESSAGES AT CHANNEL CHATS: " + JSON.stringify(chatStream));

    dispatch(messagesLoaded(chatStream));
    console.log(id + "Working My Ass Off")

  })
  .catch(err=>{
    console.log(err.response)
  })
};

export const getChatsWithAxios = () => {
  let data = JSON.stringify({
    aid: "c90bf2be-459b-46bd-9ac5-0693f07d54ac"
  });
  let config = {
    data: "aid=c90bf2be-459b-46bd-9ac5-0693f07d54ac"
  };
  axios
    .post("https://nile.rtst.co.za/api/artist/6/tokens", data, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => {
      console.log(response);
      dispatch(apiUserRegistered(response["data"]));
    })
    .catch(err => {
      console.log(err);
    });
};

const apiUserRegistering = () => ({
  type: types.REGISTERING_USER
});

const apiUserRegistered = token => ({
  type: types.REGISTERED_USER,
  token
});

const apiUserRegister = () => ({
  type: types.REGISTER_USER
});

const channelsLoaded = channels => ({
  type: types.CHANNELS_LOADED,
  channels
});

const channelLoaded = channel => ({
  type: types.FETCHED_CHANNEL,
  channel
});

const imageLoaded = img => ({
  type: types.CHANNEL_IMAGE_URI_LOADED,
  img
});

const guideLoaded = guide => ({
  type: types.CHANNEL_GUIDE_LOADED,
  guide
});
const channelLoading = () => ({
  type: types.FETCHING_CHANNEL
});

const programLoaded = channel => ({
  type: types.FETCHED_CHANNEL,
  channel
});

const catalogueLoaded = catalogue => ({
  type: types.CATALOGUE_LOADED,
  catalogue
});

const programUriLinkLoaded = link => ({
  type: types.CATALOGUE_URI_LINK_LOADED,
  link
});

const programUriLinkObjectCreated = () => ({
  type: types.CATALOGUE_URI_LINK_OBJECT_CREATED,
  link
});

const channelRstpLinkLoaded = link => ({
  type: types.CHANNEL_RSTP_LINK_LOADED,
  link
});

const streamLoadedType = quality => ({
  type: types.STREAM_LOADED_TYPE,
  quality
});

const messagesLoaded = chatMessages => ({
  type: types.MESSAGES_LOADED,
  chatMessages
});


const categoriesLoading = () => ({
  type: types.CATEGORIES_LOADING
});

const categoriesLoaded = categories => ({
  type: types.CATEGORIES_LOADED,
  categories
});

const categoryItemsLoading = () => ({
  type: types.CATEGORY_ITEMS_LOADING
});

const categoryItemsLoaded = (categoryItems, currentCategory) => ({
  type: types.CATEGORY_ITEMS_LOADED,
  categoryItems,
  currentCategory
});

const currentCategoryType = ( currentCategory ) => ({
  type: types.CURRENT_CATEGORY_TYPE,
  currentCategory
});

