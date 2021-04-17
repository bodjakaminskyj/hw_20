import React, { Component } from 'react'

export default class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            minutes: Math.floor(this.props.time / 1000 / 60),
            secounds: Math.floor(this.props.time %60000/1000),
            time_up: "",
            start: this.props.autostart,
            onTick: this.props.onTick,
            onTimeEnd: this.props.onTimeEnd,
            onTimeStart: this.props.onTimeStart,
            onTimePause: this.props.onTimePause,
            infiniteTimer: this.props.InfiniteTimer  
        }
        this.clickStart = this.clickStart.bind(this);
        this.clickStop = this.clickStop.bind(this);
    
    }
  
    
    componentDidMount() {
        if(this.state.onTimeStart){
            this.onTimeStart()
        }
        this.tiker = setInterval((()=>{
            if(this.state.start){
                this.setState({secounds: Math.ceil((this.state.secounds - 1*this.props.step/1000)*100)/100 })
                if(this.state.onTick && this.state.start){
                    this.onTick()
                    }
                if (this.state.secounds <= 0 && this.state.minutes === 0 && this.state.infiniteTimer ) {
                    this.setState({
                        minutes: Math.floor(this.props.time / 1000 / 60),
                        secounds: Math.floor(this.props.time %60000/1000)})
                }else if (this.state.secounds <= 0 && this.state.minutes === 0) {
                    clearInterval(this.tiker);
                    if(this.state.onTimeEnd){
                        this.onTimeEnd();
                    }
                    this.setState({minutes: 0, secounds: 0, time_up: "TIME IS UP" })
                }else if(this.state.secounds < 0 && this.state.minutes !== 0){
                    this.setState({secounds: 60 + this.state.secounds, minutes: this.state.minutes - 1})
                }                  
            }
                
            }), 1000);    
    }
  
    onTick= () => {
        const time = (this.state.secounds + this.state.minutes * 60) * 1000
        if(time>0){
            console.log("Залишилось часу: " + time + " ms")
        }
    }
    onTimeEnd=() => console.log("Час вийшов!")
    onTimeStart=() => {
        if(!this.state.start){
            console.log("Таймер запущено!")
        }
    }
    onTimePause=() => {
        if(this.state.start){
            console.log("Таймер на паузі!")
        }
    }
    clickStart(){
        this.setState({start: true})
        if(this.state.onTimeStart)
        this.onTimeStart()
    }
    clickStop(){
        this.setState({start: false})
        if(this.state.onTimePause)
        this.onTimePause()
    }
    
    render() {
        
        return ( 
            <div className='timer'>          
            <div>
                <span>STEP {this.props.step} мс </span>
                {this.props.autostart ? <span>AutoStart </span>:<span></span> }
                <h2>{('0'+ this.state.minutes).substr(-2)}:{ this.props.step===100 ? ('0' + Math.floor(this.state.secounds)).substr(-2) : ('0' + this.state.secounds).substr(-2) }</h2>
            </div>
            <h1>{this.state.time_up}</h1>
            <button onClick={this.clickStart} >START</button>
            <button onClick={this.clickStop} >STOP</button>
           </div>
        )
    }
}

