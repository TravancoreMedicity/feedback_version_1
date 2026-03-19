import { Box, CssVarsProvider } from '@mui/joy';
import React, { } from 'react';
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

const FeedbackReportTable = ({ rowData }) => {

    const columnDefs = React.useMemo(() => {
        if (!rowData || rowData.length === 0) return [];

        return Object.keys(rowData[0]).map((key) => ({
            headerName: key,
            field: key,
        }));
    }, [rowData]);

    return (
        <CssVarsProvider>
            <Box sx={{ height: 700, width: '100%', overflow: 'auto' }} >
                <AgGridReact
                    className="custom-age-grid ag-grid-container"
                    rowData={rowData}
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

export default FeedbackReportTable;
