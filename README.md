### Facility Layout Optimization
A proof of concept project I did a few years ago with the purpose of learning webdev in React, Redux, RxJS, SVG and WebSockets for communication with the UR10 Robot using the [RTDE interface](https://www.universal-robots.com/articles/ur/interface-communication/real-time-data-exchange-rtde-guide/).
This is the frontend part of this project. The UR10 API part is out of this scope - there's a separate project for this.

The main idea behind this app is that you can create a production hall (facility) workplace layout and then try to optimize this layout with a CRAFT algorithm (minimizing layout cost by computing the distance between the centers of each workplace). In other words, its goal is to improve existing technological processes by moving around involved workplaces.

Both the facility and the workplaces are defined in the same scale so its proportions are preserved. You can use an SVG drawing of the facility, and define
workplaces dimensions in an external application (not included in this repo, but you can easily mock the data).

A quick presentation video:<br/>
[![App presentation](https://img.youtube.com/vi/ms8XfG16RYk/0.jpg)](https://youtu.be/ms8XfG16RYk)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is quite outdated now.