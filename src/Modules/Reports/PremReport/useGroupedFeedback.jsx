import { useMemo } from "react";

const useGroupedFeedback = (feedbackdata) => {
    return useMemo(() => {
        if (!feedbackdata || feedbackdata?.length === 0) return [];

        const grouped = feedbackdata?.reduce((acc, item) => {
            const id = item?.fb_transact_slno;

            // Create base row once per transaction
            if (!acc[id]) {
                acc[id] = {
                    "Transaction ID": id,
                    "Patient Name": item?.fb_patient_name || "-",
                    "Phone": item?.fb_patient_mob || "-",
                    "Created Employee": item?.em_name || "-",
                    "Created Date": item?.create_date || "-"
                };
            }

            const question = item.fd_qa_eng?.trim();
            if (question) {

                // SPECIAL CASE FOR DESCRIPTION
                const value =
                    item.rating_name === "Description"
                        ? (item?.fb_suggestion?.trim() || "-")
                        : (item?.rating_value?.trim() || "-");

                acc[id][question] = value;
            }

            return acc;
        }, {});

        return Object.values(grouped)?.map((row, index) => ({
            "Sl No": index + 1,
            ...row
        }));
    }, [feedbackdata]);
};

export default useGroupedFeedback;
