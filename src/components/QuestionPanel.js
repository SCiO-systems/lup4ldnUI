import React, { useState, useEffect, useRef } from 'react';
import {OverlayPanel} from "primereact/components/overlaypanel/OverlayPanel";
import {LikertScale} from "./LikertScale";

export const QuestionPanel = (props) => {

    const [question, setQuestion] = useState(null);
    const [explanation, setExplanation] = useState(false);
    const [subtitle, setSubtitle] = useState(false);

    //Likert Data
    const [likertData,setlikertData] = useState();

    const op = useRef(null);

    useEffect(() => {
        if(props.question !== undefined){
            setQuestion(props.question);
        }

        if(props.question.explanationList.length > 0){
            setExplanation(true);
        }

        if(props.question.sublabel.length > 0){
            setSubtitle(true);
        }

    }, [likertData]);

    const toggleInfo = (event) => {
        op.current.toggle(event);
    }

    var pointerStyle = {
        cursor:"pointer"
    }

    //Likert Callback
    const chosenLikertValue = (value) => {
        props.likertData(value);
        setlikertData(value);
    }

    return(
        <div>
            {
                question?
                    <div id={question.id}>
                        <div>
                            <h5 className="p-mb-0">
                                {question.label}
                                {
                                    explanation?
                                        <i
                                            id={question.id+"_i"}
                                            onClick={toggleInfo}
                                            className="p-ml-2 fal fa-question-square"
                                            style={pointerStyle}
                                        />
                                        :console.log()
                                }
                            </h5>
                            {
                                explanation?
                                    <OverlayPanel
                                        ref={op}
                                        appendTo={document.body}
                                        showCloseIcon
                                        style={{width: '300px'}}>
                                        <ul>
                                            {
                                                question.explanationList.map(
                                                    (keyword) => {
                                                        return(
                                                            <li>
                                                                {keyword}
                                                            </li>
                                                        )
                                                    }
                                                )

                                            }
                                        </ul>
                                    </OverlayPanel>
                                    :console.log()
                            }
                            {
                                question.sublabel.length>0?
                                <span>
                                    ({
                                        question.sublabel.map(
                                            (item,i) => {
                                                if(question.sublabel.length === i+1){
                                                    return " "+item+" ";
                                                }else{
                                                    return " "+item+" / "
                                                }
                                            }
                                        )
                                    })
                                </span>
                                    :console.log()
                            }
                            <div className="p-mt-2 p-mb-4">
                                <LikertScale
                                    id={"likert_"+question.id}
                                    callback={chosenLikertValue}
                                    initialScale="neither_agree_or_disagree"
                                />
                            </div>
                        </div>
                    </div>
                    :console.log()
            }
        </div>
    )


}
