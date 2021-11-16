import React, { Component } from 'react';
import './percentagebar.css';

const Bar = (props) => {
	const { bgcolor, percentage } = props;
	const labelColor="white";
	
	// const labelColor=props.percentage>25?"white":"black";
	// const residualPercentage = 100-props.percentage;

const remainder = 100-props.percentage;
  return (
      <div className="percentagebar">

        <Filler percentage={props.percentage}  labelColor={labelColor}/>
        <div className = "remainder" style={{width: `${remainder}%`}}>{remainder}%</div>
      </div>
    )
}

const Filler = (props) =>{
	 //const remainder = 100-props.percentage;
			return(
				<div className="filler" style={{width: `${props.percentage}%`,background: `#FFAE42`}}>
					<Label label={props.percentage} labelColor={props.labelColor} />
				</div>
				)
		}

const Label = (props) => {
	const value = props.label;
	const color=props.labelColor;
	const remainder = 100-value;
	return(<div>
			<div style ={{color:color}} className = "label" > {value} % </div>
			
		</div>
		)
		 }
	

class PercentageBar extends Component {

	constructor(props){
		super(props)

		this.state = {
			percentage : props.percentage,
			background : props.background
		}

	}

	render() {
		return (<div>
			<Bar percentage={this.state.percentage} background={this.state.background} />
		</div>);
	

	}
}

export default PercentageBar;