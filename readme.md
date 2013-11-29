#Twitter Direct Messages - t-dm
Send and read Twitter's DMs using Twitter's API from the command line.

##Installing

```
$ npm install t-dm -g
```


##Usage:

###Initializing
To get the app to identify as you, you'll have to run the following command just once:
```
$ tdm init
```
It'll prompt you to visit a URL, that URL will ask you to identify the app on twitter, and then it'll show you a code. Back on the command line,  enter that code and the app will save your tokens on a local json file.

###Sending:

To send a message, just run the following command:

```
$ tdm destination_user_name "The complete message"
```

_Note_ that if your message is longer than 140 characters, TDM will split it into as many parts as required and it'll send all parts sequentially.

###Receiving / Reading

With TDM you can do both: listing the latest 20 messages of your inbox, or reading a specific message. 
Here is how:

####Listing inbox
In order to read the latest 20 messages of your inbox, just use the following command:

```
$ tdm read inbox
```

You'll get a list of messages with the id of the message, the screen name of the sender, when was it send, and a small part of the text.
Something like this:

```
--- [ Inbox ](last 20 messages) ---
[403959669888401400] FROM: deleteman123 - 11/22/2013 - 4:54:25 pm - This message is too ...
[403951109326524400] FROM: lookingfor_pr - 11/22/2013 - 4:20:24 pm - Testing short message
[364477670723043300] FROM: siavash - 08/5/2013 - 5:07:03 pm - Thank you so much for followin...
[352955266691657700] FROM: ProgrammingCom - 07/4/2013 - 10:01:07 pm - Thank you so much for followin...
[326768482609930240] FROM: bullsprig_js - 04/23/2013 - 3:44:11 pm - Thanks for the follow! Check o...
[315868386716430340] FROM: coderbits - 03/24/2013 - 1:51:06 pm - Here is your beta invitation f...

 To read the full content of a message, do: `tdm read ID` (where ID is the first number shown above)```
```

####Reading a specific message
If you want to the the full content of a specific message, just use the ID listed above, like this:

```
$ tdm read 315868386716430340
```

And you'll get something like this:

```
--- [ Message from: deleteman123 on 11/20/2013 - 4:44:20 pm ] ---
Hey, this is the text message received! Cool uh!?
```

##Running this code locally

If you've downloaded the code and want to try it for yourself, you'll have to register an app on the twitter dev site and rename the file under `/lib/twitter-keys-sample.json` to `/lib/twitter-keys.json` filling in the tokens required.

##Contribute

Please, feel free to fork, improve and create a pull request! All contributions are welcomed! :) Also, if you want to get in touch with me, you can send e-mails to: deleteman@gmail.com

##License
The MIT License (MIT)

Copyright (c) 2013 Fernando Doglio

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
