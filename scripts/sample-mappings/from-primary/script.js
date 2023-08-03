exports.step = function (input) {
    const data = input.records;
    const dataMapping = input.dataMapping;

    return data.map(currentRecord => {
        let output = {};
        for (const [sourceField, targetField] of Object.entries(dataMapping)) {
            switch (sourceField) {
                // Here should go all the field level logic (only based on field name)
                // Examples could include: concatenations/splitting, fields that need special handling/transformation and not just a straight 1:1 mapping

                case 'email_addresses':
                    // Handle custom logic for 'email_addresses' field
                    let email = handleEmailAddresses(currentRecord, sourceField);
                    if (email) {
                        _.set(output, targetField, email);
                    }
                    break;
                case 'phone':
                    // Handle custom logic for 'phone' field
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

    // Function to handle the custom logic for email field
    function handleEmailAddresses(currentRecord, sourceField) {
        let emailAddresses = _.get(currentRecord, sourceField);
        if (!emailAddresses) return;

        // Find the primary email in the emailAddresses array
        let primaryEmail = emailAddresses.find(email => email.primary === true);
        if (primaryEmail && primaryEmail.email) {
            console.log('Primary email found: ' + primaryEmail.email);
            // Set the primary email in the output object
            return primaryEmail.email;
        }
        return '';
    }

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