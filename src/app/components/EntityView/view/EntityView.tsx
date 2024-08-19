import React, { useState, useMemo, Fragment } from 'react'
import { useTable, Column } from 'react-table'
import { Button } from 'react-bootstrap'
import BbChart from '@/app/BuildingBlocks/BbChart'
import BbText from '@/app/BuildingBlocks/BbText'
import BbLoader from '@/app/BuildingBlocks/BbLoader'
import { EntityListProps } from '../types'
import useChartData from '../hooks/useChartData'
import { Entity } from '../types'

const EntityList: React.FC<EntityListProps> = ({ entities, isLoading }) => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null)

  const handleRowClick = (rowIndex: number, entity: Entity) => {
    setSelectedEntity(entity)
    setExpandedRow(expandedRow === rowIndex ? null : rowIndex)
  }

  const data = useMemo(() => entities || [], [entities])

  const columns: Column<Entity>[] = useMemo(
    () => [
      {
        Header: 'Matched Text',
        accessor: 'matchedText',
      },
      {
        Header: 'Confidence Score',
        accessor: 'confidenceScore',
      },
      {
        Header: 'Relevance Score',
        accessor: 'relevanceScore',
      },
      {
        Header: 'Freebase Type',
        accessor: 'freebaseTypes',
        Cell: ({ value }: { value: string[] | undefined }) => (
          <div>
            {value
              ? value
                  .join(', ')
                  .split(',')
                  .map((item, index) => <div key={index}>{item.trim()}</div>)
              : 'N/A'}
          </div>
        ),
      },
      {
        Header: 'Details',
        accessor: 'id',
        Cell: ({ row }: { row: { original: Entity; index: number } }) => (
          <Button
            onClick={() => handleRowClick(row.index, row.original)}
            aria-expanded={expandedRow === row.index}
          >
            {expandedRow === row.index ? 'Collapse' : 'Expand'}
          </Button>
        ),
      },
    ],
    [expandedRow]
  )

  const chartData = useChartData(entities, selectedEntity)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data })

  return (
    <div style={{ padding: 20 }}>
      {isLoading ? (
        <BbLoader isLoading={isLoading} variant='primary' />
      ) : entities.length > 0 ? (
        <div className='table-responsive'>
          <table
            {...getTableProps()}
            className='table table-striped table-bordered'
            style={{ width: '100%' }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} key={column.id}>
                      <BbText variant='primary'>
                        {column.render('Header')}
                      </BbText>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row)
                return (
                  <Fragment key={row.id}>
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          style={{
                            textAlign: 'center',
                            verticalAlign: 'middle',
                          }} // Centers content horizontally and vertically
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <BbText variant='secondary'>
                              {cell.render('Cell')}
                            </BbText>
                          </div>
                        </td>
                      ))}
                    </tr>
                    {expandedRow === row.index && selectedEntity && (
                      <tr>
                        <td colSpan={columns.length}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginTop: 50,
                              marginBottom: 50,
                              flexWrap: 'wrap',
                            }}
                          >
                            <div
                              style={{ flex: '1 1 30%', marginRight: '10px' }}
                            >
                              <BbText>Occurrences of Matched Text</BbText>
                              <div style={{ height: '300px' }}>
                                <BbChart
                                  variant='pie'
                                  data={chartData.textCount}
                                  width='100%'
                                  height={300}
                                />
                              </div>
                            </div>
                            <div
                              style={{ flex: '1 1 30%', marginRight: '10px' }}
                            >
                              <BbText>Distribution of Confidence Scores</BbText>
                              <div style={{ height: '300px' }}>
                                <BbChart
                                  variant='area'
                                  data={chartData.confidenceScores}
                                  width='100%'
                                  height={300}
                                />
                              </div>
                            </div>
                            <div style={{ flex: '1 1 30%' }}>
                              <BbText>Distribution of Relevance Scores</BbText>
                              <div style={{ height: '300px' }}>
                                <BbChart
                                  variant='bar'
                                  data={chartData.relevanceScores}
                                  width='100%'
                                  height={300}
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'calc(100vh - 40px)',
            textAlign: 'center',
          }}
        >
          <BbText variant='info'>Upload some data</BbText>
        </div>
      )}
    </div>
  )
}

export default EntityList
