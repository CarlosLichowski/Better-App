import React from 'react';
import './Graph.css';


interface GraphProps {
  graphDate?: string; 
  graphName?: string;
  graphValue?: string;
}


const Graph: React.FC<GraphProps> = ({ graphDate, graphName, graphValue }) => {
  return (
    <div className='graphContainer'>

      <div className='graphDescriptionContainer'>
      <p>{graphName}</p>
      <h3>{graphValue}</h3>
      <p>{graphDate}</p>
      </div>

      <div className='graphImgContainer'>
          <img/>
      </div>
    </div>
  );
};

export default Graph;