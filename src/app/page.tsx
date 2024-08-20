'use client'

import React from 'react'
import EntityList from './components/EntityView/view/EntityView'
import { useEntities } from './context/EntityContext'
import { EntityListProps } from './components/EntityView/types'

const MyPage: React.FC<EntityListProps> = ({ isLoading }) => {
  const { entities } = useEntities()

  return <EntityList entities={entities} isLoading={isLoading} />
}

export default MyPage
