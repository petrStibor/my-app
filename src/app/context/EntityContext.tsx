'use client'
import React, { createContext, useContext, useState } from 'react'
import { Entity } from '../components/EntityView/types'

type EntityContextType = {
  entities: Entity[]
  setEntities: (entities: Entity[]) => void
}

const EntityContext = createContext<EntityContextType | undefined>(undefined)

export const EntityProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [entities, setEntities] = useState<Entity[]>([])

  return (
    <EntityContext.Provider value={{ entities, setEntities }}>
      {children}
    </EntityContext.Provider>
  )
}

export const useEntities = (): EntityContextType => {
  const context = useContext(EntityContext)
  if (!context) {
    throw new Error('useEntities must be used within an EntityProvider')
  }
  return context
}
