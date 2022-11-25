import React, { useMemo, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import AdminLayout from "../../components/Layout/Admin/AdminLayout";
import GlobalFilter from "../../components/TableControls/GlobalFilter";
import swal from "sweetalert";
import { blockUser, getUsers, reset } from "../../features/users/userSlice";
import { toast } from "react-toastify";

function UserManagement2() {
  const dispatch = useDispatch();

  const {userData,isLoading,isError,message } = useSelector(state => state.users)

  console.log(useSelector(state => state.users));
 
  useEffect(() => {
    toast(message?.message)
    dispatch(reset())
    console.log(message);

    dispatch(getUsers());
  }, [dispatch]);


  const handleBlock = (id) => {
    swal({
        title: "Are you sure ?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
      }).then((willDelete) => {
      if (willDelete) {
        dispatch(blockUser(id)).then(() => {
          swal("Changed user status", {
            icon: "success",
          });
          dispatch(getUsers());
        });
      }
    });
  };
  
  const data = userData;
  const columns = useMemo(
    () => [
      {
        Header: "Index",
        accessor: "",
        Cell: (row) => {
            return <div>{Number(row.row.id) + 1}</div>;
        },
        disableSortBy: true,
        disableFilters: true,
    },{
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },{
        Header: "Status",
        accessor: "isBlocked",
        Cell: (row) => (
          <div>
            <p>{row.value===true? "Blocked user" : "not a blocked user"} </p>
          </div>
        ),
      },
      {
        Header: "Block",
        accessor: "_id",
        Cell: (row) => (
          <div>
            <button className="focus:outline-none text-white bg-zinc-500 hover:bg-white-800 focus:ring-4 focus:ring-black-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() => handleBlock(row.value)}>
            Change Status
            </button>
          </div>
        ),
      },
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
            {headerGroups.map((headerGroups) => (
              <tr {...headerGroups.getHeaderGroupProps()}>
                {headerGroups.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    scope="col"
                    className="py-3 px-6"
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
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  {row.cells.map((cell) => {
                    return (
                      <td className="py-4 px-6" {...cell.getCellProps()}>
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

export default UserManagement2;
