/**
 * Created by jose on 5/11/16.
 */
"use strict";

const gcm = require('node-gcm');
const FCM = require('fcm-node');

module.exports = {
    // send(data, tokens){
    //     var sender = new gcm.Sender('AIzaSyABUFpc2XpWfyX3TXTNmW-_YTuLf742tRo');
    //     var registrationTokens = [];
    //     registrationTokens.push(tokens);
    //     console.log('tokens: ' + registrationTokens);
    //     var message = new gcm.Message({
    //         collapseKey: 'demo',
    //         priority: 'high',
    //         contentAvailable: true,
    //         delayWhileIdle: true,
    //         timeToLive: 3,
    //         data: {
    //             message: data.body,
    //             type: data.type ? data.type : null,
    //         },
    //         notification: {
    //             title: data.title,
    //             body: data.body
    //         }
    //     });
    //     sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
    //         if(err) console.log(err);
    //         else    console.log(response);
    //     });
    // }

    send(data, tokens){
        var serverKey = 'AIzaSyA46sm2kAGBvkMdgYxzIMitzQs_EXVVtbA';
        var fcm = new FCM(serverKey);

        var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
            to: tokens,
            collapse_key: 'collapse_key',
            sound: 'default',
            notification: {
                title: data.title,
                body: data.body
            },

            data: {  //you can send only notification or only data(or include both)
                type: data.type ? data.type : null,
                message: data.body,
            }
        };

        fcm.send(message, function(err, response){
            if (err) {
                console.log(err);
                console.log("Something has gone wrong!");
            } else {
                console.log("Successfully sent with response: ", response);
            }
        });
    }
};