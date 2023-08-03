exports.step = function (input) {
    const data = input.records;
    const dataMapping = input.dataMapping;

    return data.map(currentRecord => {
        let output = {};
        for (const [sourceField, targetField] of Object.entries(dataMapping)) {
            switch (sourceField) {
                // Here should go all the field level logic (only based on field name)
                // Examples could include: concatenations/splitting, fields that need special handling/transformation and not just a straight 1:1 mapping

                case 'mainEmail':
                    // Handle custom logic for 'mainEmail' field
                    let email = _.get(currentRecord, sourceField);
                    if (!email) break;

                    _.set(output, targetField, [{
                        "primary": true,
                        "email": email,
                        "unsubscribed": false
                    }]);
                    break;
                case 'phoneNumber':
                    // Handle custom logic for 'phoneNumber' field
                    let formattedPhone = formatPhoneNumber(currentRecord, sourceField);
                    if (formattedPhone) {
                        _.set(output, targetField, formattedPhone);
                    }
                    break;
                default:
                    // Get the value from the source field in the current record
                    let value = _.get(currentRecord, sourceField);
                    if (value) {
                        // Set the value in the output object, only if it's not empty
                        _.set(output, targetField, value);
                    }
            }
        }
        return output;
    });

    // Function to format the phone number
    function formatPhoneNumber(currentRecord, sourceField) {
        let phone = _.get(currentRecord, sourceField);
        if (!phone) return;

        // Replace dots, dashes, and spaces with a single space
        let formattedPhone = phone.replace(/[.\-\s]+/g, ' ');

        // Remove everything that is not a space, a +, or a number
        formattedPhone = formattedPhone.replace(/[^\d+\s]/g, '');

        // Ensure there are no subsequent spaces and leave only one space if there are one or more
        return formattedPhone.replace(/\s+/g, ' ').trim();
    }
};