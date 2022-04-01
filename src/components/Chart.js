import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const Chart = ({indata}) =>
{ return (
      <div>
            <Bar 
                data={indata}
            />
      </div>
    
    )
}

export default Chart