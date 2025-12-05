import React, { useCallback, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Box } from '@mui/joy';
import { CellStyleModule } from 'ag-grid-enterprise';
import { ValidationModule } from 'ag-grid-enterprise';


import {
    ClientSideRowModelModule,
    TextFilterModule,
    RowStyleModule,
    NumberFilterModule,
    RowSelectionModule,
    PaginationModule,
    ModuleRegistry
} from 'ag-grid-community';



ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TextFilterModule,
    ValidationModule,
    CellStyleModule,
    RowStyleModule,
    NumberFilterModule,
    RowSelectionModule,
    PaginationModule
]);

const PatientInsertTable = ({ rowData = [], setSelectedPatients }) => {


    const onSelectionChanged = useCallback((params) => {
        const selected = params.api.getSelectedRows();
        setSelectedPatients(selected)
    }, [setSelectedPatients]);


    const columnDefs = useMemo(() => [

        // Checkbox Column
        {
            headerName: "Select",
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 50,
            maxWidth: 50,
            pinned: "left",
        },

        // Action Column
        // {
        //     headerName: "Actions",
        //     field: "IP_NO",
        //     width: 100,
        //     // maxWidth: 120,
        //     // suppressSizeToFit: true,
        //     cellRenderer: (params) => {
        //         const data = params.data;
        //         return (
        //             <Button
        //                 variant="outlined"
        //                 color="neutral"
        //                 size="sm"
        //                 onClick={() => handlePatientCheck(data)}
        //                 sx={{
        //                     fontSize: 12,
        //                     fontWeight: 600,
        //                     color: "rgba(var(--font-primary-white))"
        //                 }}
        //             >
        //                 <Tooltip title="Check Patient Details">
        //                     <DoneAllIcon
        //                         sx={{
        //                             fontSize: 18,
        //                             mr: 0.3,
        //                             color: "#1976d2"
        //                         }}
        //                     />
        //                 </Tooltip>
        //             </Button>
        //         );
        //     }
        // },

        { headerName: "IP No", field: "IP_NO" },
        { headerName: "IP Date", field: "IPD_DATE" },
        { headerName: "Mrd", field: "PT_NO" },
        { headerName: "Name", field: "PTC_PTNAME" },
        { headerName: "Gender", field: "PTC_SEX" },
        { headerName: "Age", field: "PTN_YEARAGE" },
        { headerName: "Address 1", field: "PTC_LOADD1" },
        { headerName: "Address 2", field: "PTC_LOADD2" },
        { headerName: "Address 3", field: "PTC_LOADD3" },
        { headerName: "Address 4", field: "PTC_LOADD4" },
        { headerName: "Status", field: "IPC_CURSTATUS" },
        { headerName: "Discharge Date", field: "IPD_DISC" },
        { headerName: "Mobile", field: "PTC_MOBILE" },
        { headerName: "Doctor Name", field: "DOC_NAME" },
        { headerName: "Department", field: "DPC_DESC" },

    ], []);



    return (
        <Box sx={{ height: 700, width: "100%", overflow: "auto" }}>
            <AgGridReact
                className="custom-age-grid ag-grid-container"
                rowData={rowData}
                columnDefs={columnDefs}
                rowSelection="multiple"
                onSelectionChanged={onSelectionChanged}
                pagination={true}
                paginationPageSize={20}
                getRowId={(params) => params.data.IP_NO}
                defaultColDef={{
                    flex: 1,
                    sortable: true,
                    resizable: true,
                    filter: true,
                    cellStyle: {
                        fontSize: "13px",
                        color: "rgba(var(--font-primary-white))",
                        fontWeight: 600,
                        backgroundColor: "rgba(var(--bg-card))",
                    },
                }}
            />

        </Box>
    );
};

export default PatientInsertTable;
