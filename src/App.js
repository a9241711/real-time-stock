import { useEffect,useState } from 'react';
import './App.css';
import Chart from "react-apexcharts";

const dataUrl="https://yahoo-finance-api.vercel.app/GME";
async function getData(){
  let response=await fetch(dataUrl);
  return response.json();
}

// data: [{
//   x: new Date(1538778600000),
//   y: [6629.81, 6650.5, 6623.04, 6633.33]
// },Y
// ]
const chart={
  
  options: {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  },
};
const round = (number) => {
  console.log(number)
  return number ? +(number.toFixed(2)) : null;
};
function App() {
  const[series,setSeries]=useState([{data: [{}]}])
  useEffect(()=>{
    async function getLastPrice(){
      let data= await getData();
      let gme =data.chart.result[0];
      console.log(gme);
      // x: new Date(1538778600000),
//   y: [6629.81, 6650.5, 6623.04, 6633.33]
      const quote=gme.indicators.quote[0];
      console.log(quote)
      const prices=gme.timestamp.map((times,index)=>{
        return{data: [{
          x:new Date(times*1000),
          //o h l c
          y: [quote.open[index], quote.high[index],quote.low[index], quote.close[index]].map((item)=>{
            console.log("item",item);
            return round(item)
          })
        }]}
      })
      console.log("prices",prices)
      setSeries(prices);
    }

    getLastPrice()
  },[])
  return (
    <div className="App">
           <Chart
              options={chart.options}
              series={series}
              type="candlestick"
              width="100%"
              height={350}
            />
    </div>
  );
}

export default App;
