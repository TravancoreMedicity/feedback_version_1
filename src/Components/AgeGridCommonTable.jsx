import { Box, CssVarsProvider } from '@mui/joy';
import React, { useMemo } from 'react';
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



const AgeGridCommonTable = ({ groupedFeedbackData }) => {



    const columnDefs = useMemo(() => [
        { headerName: 'Sl No', field: 'Sl No' },
        { headerName: 'Patient Name', field: 'Patient Name' },
        { headerName: 'Phone', field: 'Phone' },
        { headerName: 'IP Number', field: 'IP Number' },
        { headerName: 'Q1: Satisfaction', field: 'Q1: Satisfaction' },
        { headerName: 'Q2: Response', field: 'Q2: Response' },
        { headerName: 'Q3: Cleanliness', field: 'Q3: Cleanliness' },
        { headerName: 'Q4: Wait Time', field: 'Q4: Wait Time' },
        { headerName: 'Q5: Recommend', field: 'Q5: Recommend' },
        { headerName: 'Q6: Contact', field: 'Q6: Contact' },
        { headerName: 'Q7: Suggestion', field: 'Q7: Suggestion' },
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

export default AgeGridCommonTable