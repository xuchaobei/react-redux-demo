import React, { useEffect,useState } from 'react';

function useCurrentDate(){
  const [date, setCurrentDate] = useState(new Date());

  const tick = () => {
    setCurrentDate(new Date())
  }

  useEffect(() => {
    const timer = setInterval(()=>{tick()}, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  return date;
}

export default function Clock() {

  const date = useCurrentDate();

  return (
    <div>
      <h1>Current Time: {date.toLocaleTimeString()}.</h1>
    </div>
  );
}



// export default class Clock extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { date: new Date() };
//   }

//   componentDidMount() {
//     this.timerID = setInterval(() => this.tick(), 1000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.timerID);
//   }

//   tick() {
//     this.setState({
//       date: new Date(),
//     });
//   }

//   render() {
//     return (
//       <div>
//         <h1>Current Time: {this.state.date.toLocaleTimeString()}.</h1>
//       </div>
//     );
//   }
// }
