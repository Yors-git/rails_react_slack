import React, { useEffect,useState } from 'react'

const App=()=> {
  const [primes, setPrimes]=useState([])
  const [primesList, setPrimesList]=useState([])
  const getPrimes = async () => {
    try {
      await fetch("/api/v1/primes/index")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setPrimes(response))

      await fetch("/api/v1/primes/all")
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => setPrimesList(response))

    } catch (err) {
      console.error(err.message);
    }
  };

  const savePrimes = async (pri) => {
    try {
      const token = document.querySelector('meta[name="csrf-token"]').content;
      await fetch('/api/v1/primes/create', {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(pri)
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(()=>{
    getPrimes()
    const interval=setInterval(()=>{
      getPrimes()
    },1000)
    return()=>clearInterval(interval)
  },[]) 

  const button = (prim) => {
    let button;
    if (prim) {
      return button = <button 
                        className="btn btn-lg custom-button" 
                        role="button"
                        onClick={()=>savePrimes(prim)}
                        >Save Primes
                      </button> ;
    }
  }

  return (
    <div className="container d-flex flex-column align-items-center">
     <h1 className="display-4">Primes</h1>
      <div className=".d-flex row">
        {primes && primes.map((prime, index)=>(
            <p className="lead px-2 border border-dark" key={index}>{prime}</p>
        ))}
      </div>
       {button(primes)}
       <div className="container py-4">
       <h3 className="display-6">Saved Primes:</h3>
        <div>
          {primesList && primesList.map((primArr, index)=>(
            <div className=".d-flex row" key={index}>
            {primArr.numbers.map((el, index)=>(
              <div className=".d-flex row py-3" key={index}>
                {el.map((e, index)=>(
                  <span className="lead px-2 border border-dark" key={index}>{e}</span>
                ))}
              </div>
            ))}</div>
          ))}
        </div>
       </div>
    </div>
  );
}
export default App; 