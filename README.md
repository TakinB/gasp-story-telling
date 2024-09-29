# What is this app?

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

this is a demo of different animations.

1. Using React useRef
2. GSAP
3. 3JS

## How to run the app

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

# Using React useRef

## Demo:
![Demo]([public/sand writing.gif](https://github.com/TakinB/sand-writing-animation/blob/main/public/sand%20writing.gif))
## Creating components from svg file.

Design your SVG graphics in Illustrator and name your layers, group them accordingly as the groups will be the class name.

I use a library called SVGR [https://react-svgr.com/docs/cli/] to convert SVG files to a JS component
`npm install --save-dev @svgr/cli`
`npx @svgr/cli -- icons/clock-icon.svg`
