import * as types from "./actionTypes";
import RNFS from "react-native-fs";
import { Alert } from "react-native";
import { Actions } from "react-native-router-flux";
const axios = require("axios");
import { AsyncStorage } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import { conditionalExpression } from "@babel/types";

AsyncStorage.getItem("aid").then(AID => {
  const appID = AID;
});


export const newRegisterUser = (aid) => dispatch => {

  //dispatch(apiUserRegistering());
  console.log("AID Fdrom Action: " + aid)
  



  const options = {
    method: "POST",
    body: "aid="+ aid,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  console.log ( aid )

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

export const sendMessage = (id, opts) => dispatch => {
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

      console.log("After Stringify " + JSON.stringify(opts));

      //console.log("The sent Payload is: " + body);

      //dispatch(channelLoading(id))
      //console.log("ID USED IN STORE IS "  + id)
      const channel_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/messages";

      var config = {
        headers: { Authorization: "Bearer " + token_data["data"] }
      };

      axios
        .post(channel_url, opts, config)
        .then(function(response) {
          console.log("Axios Response: " + JSON.stringify(response["data"]));
        })
        .catch(function(error) {
          console.log("Axios Error: " + error);
        });
    });

  //.catch(err => console.log("An error occured", err))
};

export const fetchChannelObject = (id, aid) => dispatch => {
  dispatch(apiUserRegistering());
  console.log("New Cganeel Aobject " + aid )

  const options = {
    method: "POST",
    body: "aid="+aid,
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

      //dispatch(channelLoading(id))
      //console.log("ID USED IN STORE IS "  + id)
      const channel_url =
        "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/";

      fetch(channel_url, channels_options)
        .then(channel => channel.json())
        .then(channel => {
          let chan = channel["data"];
          //console.log(chan);
          dispatch(channelLoaded(chan));
          //dispatch(programUriLinkObjectCreated(chan))
        });
    });

  //.catch(err => console.log("An error occured", err))
};

export const fetchProgramImage = (id, aid) => dispatch => {
  dispatch(apiUserRegistering());
 
  console.log("Getting AID");

  const options = {
    method: "POST",
    body: "aid="+aid,
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
        "https://nile.rtst.co.za/api/artist/6/programs/" + id + "/" + "icon/";

      fetch(channel_url, channels_options)
        .then(icon => icon.json())
        .then(icon => {
          let img = icon["data"];
          dispatch(imageLoaded(img));
        });
    });

  //.catch(err => console.log("An error occured", err))
};

export const fetchChannelImage = (id, aid) => dispatch => {
  dispatch(apiUserRegistering());

  console.log("Using AID")
  const options = {
    method: "POST",
    body: "aid="+aid,
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

export const fetchChannelChats = (id, AID) => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid="+AID,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  console.log(AID + " : + +++ USING AID");

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
        "https://nile.rtst.co.za/api/artist/6/channels/" + id + "/messages/";

      fetch(channel_url, channels_options)
        //.then(chatlist => chatlist.json())
        .then(chatlist => {
          //console.log(chat)
          let chats = chatlist["data"];
          //console.log("WE AT HERE: " + JSON.stringify(chatlist))
          dispatch(messagesLoaded(chats));
        });
    })

    .catch(err => console.log("An error occured", err));
};

export const fetchProgramURILinks =  (id, profile_id, aid ) => dispatch => {
  dispatch(apiUserRegistering());
console.log("Program Links:  " + aid) 
  const options = {
    method: "POST",
    body: "aid="+aid,
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
      const programs_options = {
        method: "GET",

        headers: new Headers({
          Authorization: "Bearer " + token_data["data"],
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
       

              AsyncStorage.getItem("wifiBoolValue").then((result) => {
                console.log("Log the result here : " + result)

                if (result === 'true' &&  data.type !== 'wifi' ){
                  console.log( result + "" +  data.type )
                    Alert.alert(
                      'Download Stopped',
                      'Uncheck  - Downloads over Wi-Fi - Only in Setting'
                    )
                } else {
                  this.createDirectory();
                }
              })
             
             

              
            });

       

            

            const destPath =
              RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name + ".mp4";

            console.log("Here I am");
            let option = {
              fromUrl: url,
              toFile: destPath
            };

            const FILE_LOCATION = RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name + ".mp4";

            RNFS.exists(FILE_LOCATION).then((exists) =>{
              console.log(exists)
              if (exists){
                console.log("File Already Exist")
                Alert.alert(
                  'Program Already Exists In Playlist',
                  'Overwrite?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {this.continueDownload(url)} ,
                      style: 'ok',
                    },
                    {
                      text: 'No', 
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel'
                    },
                  ],
                  {cancelable: false},
                )   
              } else {
                
                RNFS.downloadFile(option).promise.then(res => {
                  console.log("res -----------------------------> ", res);
                });

                Alert.alert(
                  'Download Started',
                  'Check Playlist When Done'
                )
              }
            })
   
            
          };
          
          continueDownload = (url) => {
          console.log(url)
            const destPath =
            RNFS.DocumentDirectoryPath + "/NileMediaVideos/" + name + ".mp4";

            let option = {
              fromUrl: url,
              toFile: destPath
            };

            console.log('continuing download')
            RNFS.downloadFile(option).promise.then(res => {
              console.log("res -----------------------------> ", res);
            });


            Alert.alert(
              'Download Started',
              'Check Playlist When Done'
            )
          }

          createDirectory = () => {
            console.log(" Created Folder and Download Running");

            key = {
              NSURLIsExcludedFromBackupKey: true
            };

            const VIDE0_FOLDER =
              RNFS.DocumentDirectoryPath + "/NileMediaVideos/";

            RNFS.mkdir(RNFS.DocumentDirectoryPath + "/NileMediaVideos/", key);
          };

          this.downloadVideo(id, link);
        });
    });

  // .catch(err => console.log("An error occured", err))
};

export const fetchChannelRSTPLinks = (id, profile_id, aid) => dispatch => {
  dispatch(apiUserRegistering());
  console.log("OnPressItem: " +  aid )
  const options = {
    method: "POST",
    body: "aid="+aid,
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
          Actions.player({ link });
        });
    });
};

export const playHighRSTPStream = (id, profile_id) => dispatch => {
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
          Actions.player({ link });
          console.log(link);
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

export const fetchCatalogue = ( aid ) => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid="+aid,
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
      const programs_url = "https://nile.rtst.co.za/api/artist/6/programs";

      fetch(programs_url, programs_options)
        .then(programs => programs.json())
        .then(programs => {
          let progs = programs["data"];
          dispatch(catalogueLoaded(progs));
        });
    });
};

export const fetchChatStream = (aid) => dispatch => {
  dispatch(apiUserRegistering());

  const options = {
    method: "POST",
    body: "aid="+aid,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  console.log(" USING AUD: " + aid)

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
      const messages_url =
        "https://nile.rtst.co.za/api/artist/6/channels/28/messages/";

      fetch(messages_url, programs_options, { cache: "no-cache" })
        .then(chats => chats.json())
        .then(chats => {
          let chatStream = chats["data"];
          dispatch(messagesLoaded(chatStream));
        })
        .catch(err => {
          console.log(err + " : You have hit your limit for today");
        });
    })
    .catch(err => console.log("An error occured", err));
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

const messagesLoaded = chatMessages => ({
  type: types.MESSAGES_LOADED,
  chatMessages
});
