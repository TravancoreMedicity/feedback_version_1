import React, { memo, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule, TextFilterModule } from 'ag-grid-community';
import { CellStyleModule } from 'ag-grid-enterprise';
import { ValidationModule } from 'ag-grid-enterprise';
import PersonIcon from '@mui/icons-material/Person';
import SmsFailedTwoToneIcon from '@mui/icons-material/SmsFailedTwoTone';
import { Box, Button, CssVarsProvider } from '@mui/joy';
ModuleRegistry.registerModules([
    ClientSideRowModelModule,
    TextFilterModule,
    ValidationModule,
    CellStyleModule,
]);

const AccessibleTable = ({ hanldeDischargeFeedback, dischargepatients, DischargeForms }) => {

    const updatedPatients = dischargepatients?.map(patient => ({
        ...patient,
        isFormSubmitted: DischargeForms?.some(form => form?.fb_ip_num === patient["Admn. Number"])
    }));


    const columnDefs = useMemo(() => [
        {
            headerName: 'Actions',
            field: 'isFormSubmitted',
            width: 80,
            maxWidth: 100,
            minWidth: 40,
            suppressSizeToFit: true,
            cellRenderer: (params) => {
                const isSubmitted = params.data.isFormSubmitted;
                return (
                    <Button
                        disabled={isSubmitted}
                        variant="outlined"
                        color="neutral"
                        size="sm"
                        onClick={() => hanldeDischargeFeedback(params.data)}
                        sx={{
                            fontSize: 12,
                            color: 'rgba(var(--font-primary-white))',
                            fontWeight: 600,
                        }}
                    >
                        <SmsFailedTwoToneIcon
                            sx={{
                                fontSize: 13,
                                mr: 0.2,
                                color: isSubmitted ? 'Green' : 'red',
                            }}
                        />
                    </Button>
                );
            }
        },
        {
            headerName: 'Patient Name',
            field: 'Patient_Name',
            cellRenderer: (params) => {
                return (
                    <span style={{ fontWeight: 500, fontSize: 13, color: 'rgba(var(--font-primary-white))' }}>
                        <PersonIcon style={{ fontSize: 14, marginRight: 4 }} />
                        {params.value}
                    </span>
                );
            },
        },
        { headerName: 'Age', field: 'Age_year' },
        { headerName: 'Gender', field: 'Gender' },
        { headerName: 'Patient ID', field: 'Patient_No#' },
        {
            headerName: 'MRD Number',
            valueGetter: (params) => params.data['Admn. Number'],
        },
        { headerName: 'Admission Date', field: 'Admission_Date' },
        { headerName: 'Discharge Date', field: 'Discharge_Date' },
        { headerName: 'Doctor', field: 'Doctor' },
        { headerName: 'Department', field: 'Department' },
        { headerName: 'Contact', field: 'Mobile No' },
        {
            headerName: 'Address',
            valueGetter: (params) => {
                const addr1 = params.data['Address 1'] || '';
                const addr2 = params.data['Address 2'] || '';
                const addr3 = params.data['Address 3'] || '';
                return [addr1, addr2, addr3].filter(Boolean).join(', ');
            },
        },

    ], [hanldeDischargeFeedback]);

    return (
        <CssVarsProvider>
            <Box sx={{ height: 700, width: '100%' }} >
                <AgGridReact
                    className="custom-age-grid"
                    rowData={updatedPatients}
                    columnDefs={columnDefs}
                    defaultColDef={{
                        flex: 1,
                        sortable: true,
                        resizable: true,
                        filter: true,
                        cellStyle: {
                            fontSize: '13px', color: 'rgba(var(--font-primary-white))',
                            fontWeight: 600,
                            backgroundColor: 'rgba(var(--bg-card))',
                            // fontFamily: 'var(--font-varient)',
                        },
                    }}

                />
            </Box>
        </CssVarsProvider>
    );
};


export default memo(AccessibleTable);
