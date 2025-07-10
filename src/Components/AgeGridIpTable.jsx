import { Box, CssVarsProvider } from '@mui/joy';
import React, { memo, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { RowStyleModule } from 'ag-grid-community';
import { ModuleRegistry } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-enterprise';
import { ValidationModule } from 'ag-grid-enterprise';
import { NumberFilterModule } from 'ag-grid-community';
import { ClientSideRowModelModule, TextFilterModule } from 'ag-grid-community';


ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TextFilterModule,
    ValidationModule,
    CellStyleModule,
    RowStyleModule,
    NumberFilterModule
]);



const AgeGridIpTable = ({ groupedFeedbackData }) => {


    const columnDefs = useMemo(() => [
        { headerName: 'Sl No', field: 'Sl No' },
        { headerName: 'Patient Name', field: 'Patient Name' },
        { headerName: 'Phone', field: 'Phone' },
        { headerName: 'IP Number', field: 'IP Number' },
        { headerName: 'Treatment Satisfaction', field: 'Treatment Satisfaction' },
        { headerName: 'Admission Desk', field: 'Admission Desk' },
        { headerName: 'Room Wait Time', field: 'Room Wait Time' },
        { headerName: 'Room Amenities', field: 'Room Amenities' },
        { headerName: 'Cleanliness', field: 'Cleanliness' },
        { headerName: 'Doctor Behaviour', field: 'Doctor Behaviour' },
        { headerName: 'Nurse Behaviour', field: 'Nurse Behaviour' },
        { headerName: 'Nursing Care', field: 'Nursing Care' },
        { headerName: 'Billing and Discharge', field: 'Billing and Discharge' },
        { headerName: 'Cafeteria Service', field: 'Cafeteria Service' },
        { headerName: 'Overall Experience', field: 'Overall Experience' },
        { headerName: 'Recommend to Others', field: 'Recommend to Others' },
        { headerName: 'Aware of Rules', field: 'Aware of Rules' },
        { headerName: 'Cultural Support', field: 'Cultural Support' },
        { headerName: 'Create Employee', field: 'Create Employee' },
        { headerName: 'Create Date', field: 'Create Date' }
    ], []);



    return (
        <CssVarsProvider>
            <Box sx={{ height: 700, width: '100%', overflow: 'auto' }} >
                <AgGridReact
                    className="custom-age-grid ag-grid-container"
                    rowData={groupedFeedbackData}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        flex: 1,
                        sortable: true,
                        resizable: true,
                        filter: true,
                        cellStyle: (params) => {
                            return {
                                fontSize: '13px',
                                color: 'rgba(var(--font-primary-white))',
                                fontWeight: 600,
                                backgroundColor: 'rgba(var(--bg-card))',
                            };
                        },
                    }}

                />
            </Box>
        </CssVarsProvider>
    );
};

export default memo(AgeGridIpTable);