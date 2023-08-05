# p5-animation

[![NPM Version](https://img.shields.io/npm/v/p5-animation.svg?style=flat)]()
[![NPM License](https://img.shields.io/npm/l/all-contributors.svg?style=flat)](https://github.com/DemonHa/p5-animation/blob/main/LICENSE)
[![npm downloads](https://img.shields.io/npm/dt/p5-react.svg)](https://www.npmjs.com/package/p5-animation)
![test workflow](https://github.com/DemonHa/p5-animation/actions/workflows/test.yml/badge.svg)

A lightweight library which offers prebuild anaimation functions for your P5 sketches

# Install

```bash
yarn add p5-animation
```

# Quick start

```ts
import p5;
import animation, { ease } from "p5-animation";

// Define your animation properties
const { play, inProgress, progress } = animation({
  // define an animation function
  // check out `Animation functions` section
  animation: ease,
  // animation duration in ms
  duration: 1000,
});

let x = 0;

const sketch = (p5: p5) => {

  p5.setup = (p5: p5) => {
    p5.createCanvas(500, 500);
  };

  p5.draw = () => {
    p5.background("#fff");

    // set the x value to the animation value
    // parameter of `progress` is the default value
    // which is returned when the animation is not in progress
    // To create animation you have to call `progress` every frame
    x = progress(x);
    p5.rect(x, 0, 100, 100);
  };

  // We play the animation when the user clicks
  p5.mousePressed = () => {
    // Make sure another animation is not in progress
    if (!inProgress()) {
      // Define the start and end values of the animation
      play({
        from: x,
        to: x + 100,
      });
    }
  };

};

// use the sketch
new p5(sketch);
```

When you call `play` function, it returns a promise which resolves when animation is finished, you can use await based on your logic

# Animation functions

Easing functions specify the rate of change of a parameter over time.

We have some build in animation functions, but you can build your own functions

Build in functions:

- ease
- easeInSine
- easeOutSine
- easeInOutSine
- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInOutQuint

Check out [cheat sheet](https://easings.net) for easing functions
