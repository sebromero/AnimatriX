import * as React from "react";
import {Data, Override, PropertyControls, ControlType, RenderTarget } from "framer";


const data = Data({ buildOut: false})

export const BuildOutTrigger: Override = () => {
    return {        
        onTap() {            
            data.buildOut = !data.buildOut            
        },
    }
}

export const AnimationTarget: Override = props => {    
    return {
        buildOut: data.buildOut            
    }
}

// Define type of property
interface Props {
    duration: number;
    delay: number;
    buildOutDelay: number,
    initialX: number,
    initialY: number,
    targetX: number;
    targetY: number;
    startOpacity: number;
    targetOpacity: number;
    startBlur: number;
    targetBlur: number;
    targetScale: number;
    targetRotation: number;
    animate: boolean;
    iteration: number;
    startSaturation: number,
    targetSaturation: number,
    easing:  
    | "linear"
    | "ease"
    | "ease-in"
    | "ease-out"
    | "ease-in-out"
    | "ease-in-quad"
    | "ease-in-cubic"
    | "ease-in-quart"
    | "ease-in-quint"
    | "ease-in-sine"
    | "ease-in-expo"
    | "ease-in-circ"
    | "ease-in-back"
    | "ease-out-quad"
    | "ease-out-cubic"
    | "ease-out-quart"
    | "ease-out-quint"
    | "ease-out-sine"
    | "ease-out-expo"
    | "ease-out-circ"
    | "ease-out-back"
    | "ease-in-out-quad"
    | "ease-in-out-cubic"
    | "ease-in-out-quart"
    | "ease-in-out-quint"
    | "ease-in-out-sine"
    | "ease-in-out-expo"
    | "ease-in-out-circ"
    | "ease-in-out-back",
    buildOut: boolean,
}

const cubicMap = {
    "ease-in-quad": "cubic-bezier(0.550, 0.085, 0.680, 0.530)",
    "ease-in-cubic": "cubic-bezier(0.550, 0.055, 0.675, 0.190)",
    "ease-in-quart": "cubic-bezier(0.895, 0.030, 0.685, 0.220)",
    "ease-in-quint": "cubic-bezier(0.755, 0.050, 0.855, 0.060)",
    "ease-in-sine": "cubic-bezier(0.470, 0.000, 0.745, 0.715)",
    "ease-in-expo": "cubic-bezier(0.950, 0.050, 0.795, 0.035)",
    "ease-in-circ": "cubic-bezier(0.600, 0.040, 0.980, 0.335)",
    "ease-in-back": "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
    "ease-out-quad": "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
    "ease-out-cubic": "cubic-bezier(0.215, 0.610, 0.355, 1.000)",
    "ease-out-quart": "cubic-bezier(0.165, 0.840, 0.440, 1.000)",
    "ease-out-quint": "cubic-bezier(0.230, 1.000, 0.320, 1.000)",
    "ease-out-sine": "cubic-bezier(0.390, 0.575, 0.565, 1.000)",
    "ease-out-expo": "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
    "ease-out-circ": "cubic-bezier(0.075, 0.820, 0.165, 1.000)",
    "ease-out-back": "cubic-bezier(0.175, 0.885, 0.320, 1.275)",
    "ease-in-out-quad": "cubic-bezier(0.455, 0.030, 0.515, 0.955)",
    "ease-in-out-cubic": "cubic-bezier(0.645, 0.045, 0.355, 1.000)",
    "ease-in-out-quart": "cubic-bezier(0.770, 0.000, 0.175, 1.000)",
    "ease-in-out-quint": "cubic-bezier(0.860, 0.000, 0.070, 1.000)",
    "ease-in-out-sine": "cubic-bezier(0.445, 0.050, 0.550, 0.950)",
    "ease-in-out-expo": "cubic-bezier(1.000, 0.000, 0.000, 1.000)",
    "ease-in-out-circ": "cubic-bezier(0.785, 0.135, 0.150, 0.860)",
    "ease-in-out-back": "cubic-bezier(0.680, -0.550, 0.265, 1.550)"
  };

export class Animator extends React.Component<Props> {

    constructor(props){
        super(props);
    }

    // Set default properties
    static defaultProps = {
        duration: 2,
        delay: 0,
        buildOutDelay: 0,
        inititalX: 0,
        initialY: 0,
        targetX: 0,
        targetY: 0,
        startOpacity: 1,
        targetOpacity: 1,
        startBlur: 0,
        targetBlur: 0,
        targetScale: 1,
        targetRotation: 0,
        animate: false,
        easing: "linear",
        iteration: 1,
        startSaturation: 100,
        targetSaturation: 100,
        buildOut: false
    }

    // Items shown in property panel
    static propertyControls: PropertyControls<Props> = {
    duration: { type: ControlType.Number, title: "Duration", step: 0.01, unit: "s"},
    delay: { type: ControlType.Number, title: "Delay", step: 0.01, unit: "s"},
    buildOutDelay: { type: ControlType.Number, title: "Out Delay", step: 0.01, unit: "s"},
    iteration: { type: ControlType.Number, title: "Iterations", step: 1, min: -1, max: 20, unit: ""},
    easing: {
        type: ControlType.Enum,
        options: [
          "linear",
          "ease",
          "ease-in",
          "ease-out",
          "ease-in-out",
          "ease-in-quad",
          "ease-in-cubic",
          "ease-in-quart",
          "ease-in-quint",
          "ease-in-sine",
          "ease-in-expo",
          "ease-in-circ",
          "ease-in-back",
          "ease-out-quad",
          "ease-out-cubic",
          "ease-out-quart",
          "ease-out-quint",
          "ease-out-sine",
          "ease-out-expo",
          "ease-out-circ",
          "ease-out-back",
          "ease-in-out-quad",
          "ease-in-out-cubic",
          "ease-in-out-quart",
          "ease-in-out-quint",
          "ease-in-out-sine",
          "ease-in-out-expo",
          "ease-in-out-circ",
          "ease-in-out-back"
        ],
        title: "Easing"
      },
    initialX: { type: ControlType.Number, title: "Initial X", min: -1000, max: 1000, unit: "px"},
    initialY: { type: ControlType.Number, title: "Initial Y", min: -1000, max: 1000, unit: "px"},
    targetX: { type: ControlType.Number, title: "Target X", min: -1000, max: 1000, unit: "px"},
    targetY: { type: ControlType.Number, title: "Target Y", min: -1000, max: 1000, unit: "px"},
    startOpacity: { type: ControlType.Number, title: "Start Opacity", step: 0.01, min: 0, max: 1},
    targetOpacity: { type: ControlType.Number, title: "Target Opacity", step: 0.01, min: 0, max: 1},
    targetScale: { type: ControlType.Number, title: "Target Scale", step: 0.01, min: 0, max: 100},
    targetRotation: { type: ControlType.Number, title: "Target Rotation", step: 1, min: -360, max: 360},
    startBlur: { type: ControlType.Number, title: "Start Blur", step: 1, min: 0, max: 180},
    targetBlur: { type: ControlType.Number, title: "Target Blur", step: 1, min: 0, max: 180},
    startSaturation: { type: ControlType.Number, title: "S. Saturation", step: 1, min: 0, max: 100},
    targetSaturation: { type: ControlType.Number, title: "T. Saturation", step: 1, min: 0, max: 100},
    animate: {
        type: ControlType.Boolean,
        title: "Preview"
    },
    }

    render() {
        let hash =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        const timingFunction = cubicMap[this.props.easing] || this.props.easing;
        let iteration = this.props.iteration + "";
        if (RenderTarget.current() != RenderTarget.preview && this.props.animate) {
            iteration = "infinite";
        }else if(RenderTarget.current() != RenderTarget.preview && !this.props.animate){
            iteration = "0";
        }else if(RenderTarget.current() == RenderTarget.preview && iteration == "-1"){
            iteration = "infinite";
        }
        const css = `
        @-webkit-keyframes aframe${hash} {
            0% {
                transform: scale(1.0) translate(${this.props.initialX}px,${this.props.initialY}px) rotate(0deg);
                opacity: ${this.props.startOpacity};
                filter: blur(${this.props.startBlur}px) saturate(${this.props.startSaturation}%);
            }
            100% {
                transform: scale(${this.props.targetScale}) translate(${this.props.targetX}px,${this.props.targetY}px) rotate(${this.props.targetRotation}deg);
                opacity: ${this.props.targetOpacity};
                filter: blur(${this.props.targetBlur}px)  saturate(${this.props.targetSaturation}%);
            }
        }`;
        // Add class 
        return (
            <div
            style={{
                height: "100%",
                display: "flex",
                animationName: `aframe${hash}`,
                animationDuration: `${this.props.duration}s`,
                animationDelay: this.props.buildOut ? `${this.props.buildOutDelay}s` : `${this.props.delay}s`,
                animationIterationCount: `${iteration}`,
                animationTimingFunction: timingFunction,
                transformOrigin: "50% 50%",
                animationFillMode: "forwards",
                animationDirection: this.props.buildOut ? "reverse" : "normal",
                transform: this.props.buildOut ? `scale(${this.props.targetScale}) translate(${this.props.targetX}px,${this.props.targetY}px) rotate(${this.props.targetRotation}deg)`: `scale(1.0) translate(${this.props.initialX}px,${this.props.initialY}px) rotate(0deg)`,
                opacity: +(this.props.buildOut ? `${this.props.targetOpacity}` :  `${this.props.startOpacity}`),
                filter: this.props.buildOut ? `blur(${this.props.targetBlur}px)  saturate(${this.props.targetSaturation}%)` : `blur(${this.props.startBlur}px) saturate(${this.props.startSaturation}%)`
            }}>

                {this.props.children}
                <style>{css}</style>
            </div>
        );
    }
}