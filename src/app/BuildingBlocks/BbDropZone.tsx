'use client'
import { useState } from 'react'
import { Card, Alert, Button } from 'react-bootstrap'
import axios from 'axios'
import BbText from './BbText'

type BbDropzoneProps<T> = {
  processResponse: (data: any) => T[]
  apiEndpoint: string
  onDataProcessed: (data: T[]) => void
  onClose: () => void
}

const BbDropzone = <T,>({
  processResponse,
  apiEndpoint,
  onDataProcessed,
  onClose,
}: BbDropzoneProps<T>) => {
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        setFileContent(e.target.result as string)
      }
    }
    reader.readAsText(file)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleAnalyzeText = async () => {
    if (!fileContent) return
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post(
        apiEndpoint,
        { text: fileContent },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      const processedData = processResponse(response.data)
      onDataProcessed(processedData)
      onClose()
    } catch (err: any) {
      setError(
        `Error: ${err.response?.status || 500} - ${
          err.response?.data.message || 'Failed to fetch data'
        }`
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Card
        className='p-3 mb-2'
        style={{
          border: '2px dashed #007bff',
          cursor: 'pointer',
          width: '100%',
          textAlign: 'center',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <Card.Title>
          <BbText>Upload or Drag-and-Drop a Text File</BbText>
        </Card.Title>
        <input
          type='file'
          accept='.txt'
          onChange={handleFileSelect}
          style={{ display: 'none' }}
          id='file-input'
        />
        <label htmlFor='file-input'>
          <Button
            onClick={() => document.getElementById('file-input')?.click()}
            disabled={loading}
            className='mt-2'
          >
            Select File
          </Button>
        </label>
        <Button
          onClick={handleAnalyzeText}
          disabled={!fileContent || loading}
          className='mt-2'
        >
          {loading ? 'Analyzing...' : 'Analyze Text'}
        </Button>
        {error && (
          <Alert variant='danger' className='mt-2'>
            {error}
          </Alert>
        )}
      </Card>
    </div>
  )
}

export default BbDropzone
