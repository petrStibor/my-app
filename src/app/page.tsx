'use client'

import React from 'react'
import EntityList from './components/EntityView/view/EntityView'
import { useEntities } from './context/EntityContext'

const MyPage = () => {
  const { entities } = useEntities()

  return <EntityList entities={entities} isLoading={false} />
}

export default MyPage
