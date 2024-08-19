import React from 'react'
import { useTable, useSortBy, useFilters } from 'react-table'
import { Table as BootstrapTable } from 'react-bootstrap'

type BbTableProps<T extends object> = {
  columns: any[]
  data: T[]
  filterPlaceholder?: string
  // Optionally include additional props or configuration
}

const BbTable = <T extends object>({
  columns,
  data,
  filterPlaceholder = 'Filter...',
}: BbTableProps<T>) => {
  // React Table setup
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable({ columns, data }, useFilters, useSortBy)

  return (
    <div>
      {/* Filter Input */}
      <input
        type='text'
        placeholder={filterPlaceholder}
        onChange={(e) => setFilter('filter', e.target.value)}
        className='form-control mb-3'
      />

      {/* Render the table with react-table */}
      <BootstrapTable {...getTableProps()} striped bordered hover>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add sort indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </BootstrapTable>
    </div>
  )
}

export default BbTable
