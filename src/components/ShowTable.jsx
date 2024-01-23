import { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import data from '../irregular.json'
const ShowTable = () => {
    const [rowData] = useState(data.verbs);
    const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          minWidth: 180,
          filter: true,
          floatingFilter: true,
          sortable: true,
          resizable: false,
          editable: true,
        };
      }, []);
      const dataTypeDefinitions = useMemo(() => {
        return {
          object: {
            baseDataType: 'object',
            extendsDataType: 'object',
            valueParser: (params) => ({ name: params.newValue }),
            valueFormatter: (params) =>
              params.value == null ? '' : params.value.name,
          },
        };
      }, []);
    const [columnDefs] = useState([
        { field: "Base" },
        { field: "Past-simple" },
        { field: "Past-Participle" }
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 620 }}>
            <AgGridReact 
            rowData={rowData} 
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            dataTypeDefinitions={dataTypeDefinitions}
            ></AgGridReact>
        </div>
    );
};

export default ShowTable;