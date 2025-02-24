import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import axios from 'axios'

const Products = () => {
  const [products, setProduct] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios('/api/products')
        if (data) {
          setProduct(data)
          setLoading(false)
        }
      } catch (error) {}
    }

    fetchProducts()
  }, [])

  if (loading) return <p>Loading...</p>
  return (
    <div className='bg-red-100  mx-auto px-6 py-4'>
      <div className='flex flex-col gap-4 justify-between items-center rounded-r-sm max-w-4xl mx-auto'>
        {products.length > 0 &&(
          products.map((product) => (
            <div key={product._id} className='flex justify-between items-center w-full'>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
            </div>
          ))
        )}
       
      </div>
    </div>
  )
}

export default Products
