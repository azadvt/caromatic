import React, { useMemo, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import { deleteCar, getCars } from "../../features/Car/carSlice";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import GlobalFilter from "../../components/TableControls/GlobalFilter";
import swal from "sweetalert";
import { getBookingsAdmin } from "../../features/Booking/bookingSlice";

function AdminBookings() {
  const dispatch = useDispatch();
  const { bookingData ,isLoading, isSuccess} = useSelector((state) => state.booking);
  const handleDelete = (id) => {
    swal({
      title: "Are you sure to Delete this Order?",
      text: "The Order will be Not showing in website",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCar(id)).then(() => {
          swal("Car was Deleted Successfully", {
            icon: "success",
          });
          dispatch(getCars());
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getCars());
    dispatch(getBookingsAdmin());
  }, []);
  const data = bookingData;
  const columns = useMemo(
    () => [
      {
        Header: "User",
        accessor: "name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Drop off Location",
        accessor: "dropOffLocation",
      },

      {
        Header: "Drop off Time",
        accessor: "dropOffTime",
      },
      {
        Header: "Pick Up Location",
        accessor: "pickUpLocation",
      },
      {
        Header: "Pick Up Time",
        accessor: "pickUpTime",
      },
      {
        Header: "Total",
        accessor: "total",
      },
    //   {
    //     Header: "Delete",
    //     accessor: "_id",
    //     Cell: (row) => (
    //       <div>
    //         <button onClick={() => handleDelete(row.value)}>
    //           <img src={dlt} alt="" width={15} />
    //         </button>
    //       </div>
    //     ),
    //   },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    prepareRow,
    gotoPage,
    pageCount,
    setPageSize,
    state,
    setGlobalFilter,
  } = tableInstance;
  const { pageIndex, pageSize } = state;
  const { globalFilter } = state;

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <AdminLayout>
      <div className="flex flex-row-reverse">
        
        <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-6">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            {headerGroups.map((headerGroups,i) => (
              <tr {...headerGroups.getHeaderGroupProps()} key={i}>
                {headerGroups.headers.map((column,i) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    scope="col"
                    className="py-3 px-6" key={i}
                  >
                    {column.render("Header")}{" "}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? "⬇" : "⬆") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row,i) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()} key={i}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.cells.map((cell,i) => {
                    return (
                      <td className="py-4 px-6" {...cell.getCellProps()} key={i}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="m-4 flex flex-row-reverse gap-3">
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </button>
          <div>
            {" "}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              Next
            </button>
          </div>
          <div>
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              Previous
            </button>{" "}
          </div>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </button>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[10, 25, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>{" "}
          <span>
            | Go to page :{" "}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const pageNumber = e.target.value
                  ? Number(e.target.value) - 1
                  : 0;
                gotoPage(pageNumber);
              }}
              style={{ width: "50px" }}
            />
          </span>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminBookings;
