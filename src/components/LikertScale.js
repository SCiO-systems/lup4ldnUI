import {RadioButton} from "primereact/components/radiobutton/RadioButton";
import React, {useEffect, useState} from "react";

import styles from './LikertScale.css'


export const LikertScale = (props) => {

    const [value, setValue] = useState(null);

    const likertRange = [
        "strongly_disagree",
        "disagree",
        "somewhat_disagree",
        "neither_agree_or_disagree",
        "somewhat_agree",
        "agree",
        "strongly_agree"
    ]


    useEffect(() => {
        if(props.initialScale != undefined){
            if(likertRange.includes(props.initialScale)){
                setValue(props.initialScale);
            }
        }
    },[]);


    const selectValue =(e)=>{
        setValue(e.value);
        if(props.callback != undefined){

            let humanReadable = e.value;

            let numericScale = 0;
            if(humanReadable === "strongly_disagree"){
                numericScale = -3;
            }else if(humanReadable === "disagree"){
                numericScale = -2;
            }else if(humanReadable === "somewhat_disagree"){
                numericScale = -1;
            }else if(humanReadable === "neither_agree_or_disagree"){
                numericScale = 0;
            }else if(humanReadable === "somewhat_agree"){
                numericScale = 1;
            }else if(humanReadable === "agree"){
                numericScale = 2;
            }else if(humanReadable === "strongly_agree"){
                numericScale = 3;
            }

            let componentId = undefined;
            if(props.id != undefined){
                componentId = props.id;
            }

            const valueSelection ={
                humanReadable:humanReadable,
                numericValue:numericScale,
                id:componentId
            }

            props.callback(valueSelection);
        }
    }

    return (

        <div>
            <RadioButton
                className="strongly_disagree  small "{...styles}
                value="strongly_disagree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'strongly_disagree'}
            />
            <RadioButton
                className="likert disagree  small "{...styles}
                value="disagree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'disagree'}
            />
            <RadioButton
                className="likert somewhat_disagree  small "{...styles}
                value="somewhat_disagree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'somewhat_disagree'}
            />
            <RadioButton
                className="likert neither_agree_or_disagree  small "{...styles}
                value="neither_agree_or_disagree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'neither_agree_or_disagree'}
            />
            <RadioButton
                className="likert somewhat_agree  small "{...styles}
                value="somewhat_agree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'somewhat_agree'}
            />
            <RadioButton
                className="likert agree  small "{...styles}
                value="agree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'agree'}
            />
            <RadioButton
                className="likert strongly_agree  small "{...styles}
                value="strongly_agree"
                name="likertscale"
                onChange={(e) => selectValue(e)}
                checked={value === 'strongly_agree'}
            />
        </div>

    );
}
