import { useEffect, useState } from "react";


const Counter = () => {
    const [second,setSecond] = useState(60);
    const [minute,setMinute] = useState(54);
    const [hour,setHour] = useState(23);
    const [day,setDay] = useState(7);

    // useEffect(()=>{
    //     const changeValue = value + 1;
    //     setValue(changeValue)
    // },[setValue,value])
    

    useEffect(() => {
        const interval = setInterval(() => {
          setSecond((prevSeconds) => {
            if (prevSeconds > 0) {
              return prevSeconds - 1;
            } else {
              setMinute((prevMinutes) => {
                if (prevMinutes > 0) {
                  return prevMinutes - 1;
                } else {
                  setHour((prevHours) => {
                    if (prevHours > 0) {
                      return prevHours - 1;
                    } else {
                      setDay((prevDays) => {
                        if (prevDays > 0) {
                          return prevDays - 1;
                        } else {
                          // Reset the countdown to 99 when all values are 0
                          return 99;
                        }
                      });
                      return 23; // Reset hours to 23 when it reaches 0
                    }
                  });
                  return 59; // Reset minutes to 59 when it reaches 0
                }
              });
              return 59; // Reset seconds to 59 when it reaches 0
            }
          });
        }, 1000); // Decrease the value every 1000 milliseconds (1 second)
    
        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
      }, []);
    
      useEffect(() => {
        // Set the CSS variable using inline style
        document.documentElement.style.setProperty('--value', String(day).padStart(2, '0'));
    
        // Update the CSS variable whenever the days value changes
      }, [day]);
    
    
    return (
        <div >
            <div className="hero min-h-screen rounded" style={{backgroundImage: 'url(https://www.risk.net/sites/default/files/styles/landscape_750_463/public/2018-08/time-running-out---clock---Getty.jpg?h=f0ea7df2&itok=oplQIQaj)'}}>
                <div className="hero-overlay bg-opacity-60 rounded"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                    <div className="grid grid-flow-col gap-5 text-center auto-cols-max justify-center">
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                    <span style={{"--value":day}}></span>
                    </span>
                    days
                </div> 
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                    <span style={{"--value":hour}}></span>
                    </span>
                    hours
                </div> 
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                    <span style={{"--value":minute}}></span>
                    </span>
                    min
                </div> 
                <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span className="countdown font-mono text-5xl">
                    <span style={{"--value":second}}></span>
                    </span>
                    sec
                </div>
            </div>
                    </div>
                    
                </div>
            </div>
            {/* ------------------------- */}
           
        </div>
    );
};

export default Counter;