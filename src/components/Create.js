import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

const Create = () => {
  const [description, setDescription] = useState('')
  const [stock, setStock] = useState(0)
  const navigate = useNavigate()

  const productsCollection = collection(db, "products")
  
  const store = async (e) => {
    e.preventDefault();
    await addDoc(productsCollection, {description: description, stock:stock})
    navigate (`/`)
  }
  return (
    <div className='container'>
        <div className='row'>
            <div className='col'>
              <h1>Create Product</h1>

              <form onSubmit={store}>
                <div className='mb-3'>
                </div>
                  <label className='form-label'>description</label>
                  <input 
                    value={description}
                    onCharge={ (e) => setDescription(e.target.value)}
                    type="text"
                    className='form-control'
                    />
              </form>
            </div>
        </div>
    </div>
  )
}

export default Create