import React, { useEffect,useState } from 'react'

const App=()=> {
  const [primes, setPrimes]=useState([])
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
      console.log(err.message);
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
    </div>
  );
}
export default App; 