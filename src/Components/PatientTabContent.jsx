import { Box } from '@mui/joy';

const PatientTabContent = ({ activeTab, bedView, dischargeView }) => {
    return (
        <Box sx={{ flex: 1, height: '100%', overflow: 'hidden' }}>
            {activeTab === 'BED' && bedView}
            {activeTab === 'DISCHARGE' && dischargeView}
        </Box>
    );
};

export default PatientTabContent;
