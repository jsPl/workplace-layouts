A project for testing development with React, Redux, SVG and WebSockets for communication with an UR10 Robot using the [RTDE interface](https://www.universal-robots.com/articles/ur/interface-communication/real-time-data-exchange-rtde-guide/).
This is the frontend part of this project.

The main idea behind this app is that you can create a production hall (facility) workplace layout and then try to optimize this layout with a CRAFT algorithm (minimizing layout cost by computing the distance between the centers of each workplace).

Both the facility and the workplaces are defined in the same scale. You can use an svg drawing of the facility, and define
workplaces rectangular dimensions in an external application (not included in this repo, but you can easily mock the data).

A quick presentation:
[![App presentation](http://img.youtube.com/vi/ms8XfG16RYk/0.jpg)](http://www.youtube.com/watch?v=ms8XfG16RYk)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).