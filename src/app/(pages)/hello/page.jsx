'use client'

import React, { useState, useEffect } from 'react'

const HelloPage = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // APIを呼び出す関数
  const fetchHelloAPI = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/hello')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      setData(result)
      console.log('API Response:', result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ページ読み込み時に自動でAPIを呼び出す
  useEffect(() => {
    fetchHelloAPI()
  }, [])

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Hello API Test Page</h1>
      
      <button 
        onClick={fetchHelloAPI} 
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Loading...' : 'Call API'}
      </button>

      {error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffebee', 
          color: '#c62828',
          borderRadius: '5px',
          marginBottom: '20px'
        }}>
          Error: {error}
        </div>
      )}

      {data && (
        <div style={{
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '5px',
          border: '1px solid #ddd'
        }}>
          <h3 style={{ color: '#2f2f2f' }}>API Response:</h3>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#2f2f2f' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default HelloPage