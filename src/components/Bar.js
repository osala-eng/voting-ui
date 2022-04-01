import Plot from 'react-plotly.js';

const Bar = () => {
  return (
    <div>
        <Plot
            data={[
                {
                    type: 'bar',
                    x: ['a', 'b', 'c'],
                    y: [10, 15, 5]
                }
            ]}
        />

    </div>
  )
}

export default Bar