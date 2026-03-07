import { AddOutcome } from './AddOutcome'
import './App.css'
import { OutcomeMeta } from './OutcomeMeta';
import { Simulator } from './Simulator';

function App() {

  return (
    <div className='container'>
      <div className="admin">
        <AddOutcome />
        <OutcomeMeta />
      </div>
      <div className='sim'>
        <Simulator />
      </div>
    </div>
  )
}

export default App
