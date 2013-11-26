#Twitter Direct Messages - t-dm
Send and read Twitter's DMs using Twitter's API from the command line.

##Installing

```
$ npm install tdm -g
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
-- TODO

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
