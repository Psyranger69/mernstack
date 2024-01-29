import { useCategoriesContext } from "../hooks/useCategoriesContext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CategoryDetails = ({ categories }) => {
  const { dispatch } = useCategoriesContext();
  const [expandedRows, setExpandedRows] = useState(null);
  const handledelete = async (event) => {
    const pid = event.currentTarget.getAttribute("data-pid");
    const sid = event.currentTarget.getAttribute("data-sid");
    const ssid = event.currentTarget.getAttribute("data-ssid");
    console.log(event.target.dataset);
    const response = await fetch(
      "http://localhost:4000/api/categories/" + pid + "/" + sid + "/" + ssid,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();
    if (response.ok) {
      if (sid === "0" && ssid === "0") {
        console.log("delcat");
        dispatch({ type: "DELETE_CATEGORY", payload: json });
      } else {
        dispatch({ type: "DELETE_SUB_CATEGORY", payload: json });
      }
    }
  };
  const deletebutton = (rowData, options) => {
    return (
      <Button
        type="button"
        data-pid={rowData._id}
        data-sid="0"
        data-ssid="0"
        onClick={handledelete}
        className="btn btn-outline-danger"
      >
        <FontAwesomeIcon icon={["fsr", "trash-can"]}></FontAwesomeIcon>
      </Button>
    );
  };
  const allowExpansion = (rowData) => {
    return rowData.subcategories.length > 0;
  };
  const cols = [
    { field: "catname", header: "Name" },
    { field: "description", header: "Description" },
    { field: "image", header: "Image" },
    { field: "status", header: "Status" },
  ];

  const exportColumns = cols.map((col) => ({
    title: col.header,
    dataKey: col.field,
  }));
  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);

        doc.autoTable(exportColumns, categories);
        doc.save("categories.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(categories);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "categories");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };
  const header = (
    <div className="row">
      <div className="col-sm-6 mb-2 d-flex align-items-center justify-content-md-start justify-content-center">
        <button
          type="button"
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#categorycreationmodal"
        >
          ADD NEW
          <FontAwesomeIcon
            icon={["fas", "plus"]}
            style={{ marginLeft: "10px" }}
          ></FontAwesomeIcon>
        </button>
      </div>
      <div className="col-sm-6 mb-2 d-flex align-items-center justify-content-md-end justify-content-center gap-2">
        <Button
          type="button"
          icon="pi pi-file-excel"
          severity="success"
          rounded
          className="rounded-circle"
          onClick={exportExcel}
          data-pr-tooltip="XLS"
        />
        <Button
          type="button"
          icon="pi pi-file-pdf"
          severity="warning"
          rounded
          className="rounded-circle"
          onClick={exportPdf}
          data-pr-tooltip="PDF"
        />
      </div>
    </div>
  );
  const subcategoryExpand = (data) => {
    const subdeletebutton = (rowData, options) => {
      return (
        <Button
          type="button"
          data-pid={data._id}
          data-sid={rowData._id}
          data-ssid="0"
          onClick={handledelete}
          className="btn btn-outline-danger"
        >
          <FontAwesomeIcon icon={["fsr", "trash-can"]}></FontAwesomeIcon>
        </Button>
      );
    };
    return (
      <div className="p-3">
        <h5>Subcategories of {data.catname}</h5>
        <DataTable value={data.subcategories} removableSort>
          <Column field="subcatname" header="Name" sortable></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column field="image" header="Image" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
          <Column field={subdeletebutton} header="Actions"></Column>
        </DataTable>
      </div>
    );
  };
  return (
    <div className="category-details">
      <div className="card mb-3 mt-3">
        <DataTable
          stripedRows
          removableSort
          value={categories}
          tableStyle={{ minWidth: "50rem" }}
          rowExpansionTemplate={subcategoryExpand}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          header={header}
        >
          <Column expander={allowExpansion} style={{ width: "5rem" }} />
          <Column field="catname" header="Name" sortable></Column>
          <Column field="description" header="Description" sortable></Column>
          <Column field="image" header="Image" sortable></Column>
          <Column field="status" header="Status" sortable></Column>
          <Column field={deletebutton} header="Actions"></Column>
          {/* {columns.map((col, i) => (
          <Column key={col.field} field={col.field} header={col.header} />
        ))} */}
        </DataTable>
      </div>
    </div>
  );
};

export default CategoryDetails;
