import { useState } from 'react'
import './App.css'
import PollCard from './components/PollCard'

const items = [
        {id: 1, title: "Who is better: Messi or Ronaldo?", description: "Choose who you believe is the better soccer player."},
        {id: 2, title: "Best season to watch Gilmore Girls?", description: "Choose the best season."},
        {id: 3, title: "Where should I travel?", description: "Choose the best vacation spot."},
        {id: 4, title: "Who is better: MJ or MJ?", description: "Choose who you believe is the better MJ."},
        {id: 5, title: "What to do on a Creek?", description: "Although the creek is known to be quiet, choose what YOU would do."},
    ];

function App() {
  return (
    <>
        <div>
            <h1>Poll Up</h1>
        </div> 

        <div>
            {items.map((item) => (
                <PollCard key={item.id} poll={item} />
            ))}
        </div>
    </>
  )
}

export default App
