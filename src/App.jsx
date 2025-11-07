import { useState } from 'react'
import Header from './components/Header/Header.jsx'
import Dashboard from './pages/Dashboard/Dashboard.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [collections, setCollections] = useState([
    {
      id: 1,
      name: 'Action Figures',
      category: 'Brinquedos',
      itemCount: 15,
      value: 1250.00,
      image: 'https://via.placeholder.com/300x200/4f46e5/ffffff?text=Action+Figures'
    },
    {
      id: 2,
      name: 'Moedas Raras',
      category: 'Numismática',
      itemCount: 42,
      value: 8900.00,
      image: 'https://via.placeholder.com/300x200/10b981/ffffff?text=Moedas+Raras'
    },
    {
      id: 3,
      name: 'Vinil Clássico',
      category: 'Música',
      itemCount: 28,
      value: 3200.00,
      image: 'https://via.placeholder.com/300x200/f59e0b/ffffff?text=Vinil+Clássico'
    }
  ])

  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Superman Action Figure',
      collectionId: 1,
      value: 89.90,
      condition: 'Excelente',
      acquiredDate: '2024-01-15',
      image: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=Superman'
    },
    {
      id: 2,
      name: 'Moeda Real 1743',
      collectionId: 2,
      value: 450.00,
      condition: 'Rara',
      acquiredDate: '2024-02-10',
      image: 'https://via.placeholder.com/200x200/10b981/ffffff?text=Moeda+1743'
    }
  ])

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard collections={collections} items={items} />
      case 'collections':
        return <Collections 
          collections={collections} 
          setCollections={setCollections}
          items={items}
        />
      case 'items':
        return <Items 
          items={items} 
          setItems={setItems}
          collections={collections}
        />
      default:
        return <Dashboard collections={collections} items={items} />
    }
  }

  return (
    <div className="App">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default App