import type { DataTableProps } from "@/types/dataTable";

const DataTable = <T,>({
  data,
  columns,
  rowKey,
  emptyState,
}: DataTableProps<T>) => {
  if (data.length === 0) {
    return (
      emptyState ?? <div className="doctor-request-empty">No data found</div>
    );
  }
  return (
    <div className="doctor-request-table-wrapper">
      <table className="doctor-request-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row) => (
            <tr key={rowKey(row)}>
              {columns.map((column) => (
                <td key={column.key} className={column.className}>
                  {column.render ? column.render(row) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
