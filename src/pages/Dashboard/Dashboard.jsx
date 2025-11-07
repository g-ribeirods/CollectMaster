import { useState } from 'react'
import CollectionCard from '../../components/CollectionCard/CollectionCard'

function Dashboard({ collections, items }) {
  const totalValue = collections.reduce((sum, collection) => sum + collection.value, 0)
  const totalItems = collections.reduce((sum, collection) => sum + collection.itemCount, 0)
  const totalCollections = collections.length

  const recentItems = items.slice(0, 5)

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Dashboard</h1>
        <p>Visão geral das suas coleções</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Valor Total</h3>
            <p className="stat-value">R$ {totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Coleções</h3>
            <p className="stat-value">{totalCollections}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>Itens</h3>
            <p className="stat-value">{totalItems}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>Valor Médio</h3>
            <p className="stat-value">R$ {(totalValue / totalItems || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="recent-collections">
          <h2>📚 Suas Coleções</h2>
          <div className="collections-grid">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </section>

        <section className="recent-items">
          <h2>🆕 Itens Recentes</h2>
          <div className="items-list">
            {recentItems.map(item => (
              <div key={item.id} className="recent-item">
                <img src={item.image} alt={item.name} />
                <div className="item-info">
                  <h4>{item.name}</h4>
                  <p>R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                  <span className="item-condition">{item.condition}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard