/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { HiEye, HiPencilAlt, HiTrash } from 'react-icons/hi';
import Button from '../buttons/Button';

function TableBody({ data, columns }) {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr key={rowIndex.id} className="bg-white border-b hover:bg-gray-50">
          {columns.map((column, colIndex) => (
            <td key={colIndex.id} className={column.type === 'action' ? 'px-2 md:py-2' : column.className}>
              {column.type === 'image' ? (
                <div className="flex justify-center">
                  <img src={row[column.dataKey]} alt={`image-${rowIndex.id}`} className={column.imgClassName} />
                </div>
              ) : column.type === 'action' ? (
                <div className="flex gap-2">
                  <Button variant="warning" size="base" centerIcon={HiEye} />
                  <Button variant="blue" size="base" centerIcon={HiPencilAlt} />
                  <Button variant="danger" size="base" centerIcon={HiTrash} />
                </div>
              ) : (
                row[column.dataKey]
              )}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

function CustomTable({ data, columns }) {
  return (
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-900 border bg-gray-50">
        <tr>
          {columns.map((column, colIndex) => (
            <th key={colIndex.id} scope="col" className={column.type === 'action' ? 'p-2 md:py-2' : column.className}>
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default CustomTable;
