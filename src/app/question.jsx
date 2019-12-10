import React, {Fragment} from 'react';

const styles = {
    paddingLeft: 20
}

export const Question = ({id, title, options, selectedValue, onSelect}) => {
    return (
        <Fragment>
            <div>{title}</div>
            { 
                options.map((opt, index) => (
                    <div style={styles} key={`question#${id}-opt#${index}`}>
                        <input  
                            type="radio" 
                            value={opt}
                            checked={selectedValue === index}
                            onChange={() => onSelect(index)}
                        />
                        {opt}
                    </div>
                ))
            }
        </Fragment>
    )
}