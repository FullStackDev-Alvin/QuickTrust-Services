import React,{useState} from 'react'
import UpdateFormNewArivals from '../UpdateFormNewArivals/UpdateFormNewArivals'

const EditNewArrivals = () => {
  const [selectedBlock, setSelectedBlock] = useState(1);

  const handleUpdateSubmit = (e, updatedData) => {
    e.preventDefault();
    console.log(`Updated Data for ${selectedBlock}:`, updatedData);
  };

  return (
    <div>
      <div className="flex space-x-4 p-5">
        <button onClick={() => setSelectedBlock(1)} className="p-2 bg-gray-400 rounded">Toyota</button>
        <button onClick={() => setSelectedBlock(2)} className="p-2 bg-gray-400 rounded">Mercedes</button>
        <button onClick={() => setSelectedBlock(3)} className="p-2 bg-gray-400 rounded">Land</button>
      </div>

      <UpdateFormNewArivals 
        onSubmit={handleUpdateSubmit} 
        title={selectedBlock} 
        selectedBlock={selectedBlock} 
      />
    </div>
  )
}

export default EditNewArrivals;