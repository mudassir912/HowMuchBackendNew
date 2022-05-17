
const createResponse = (
    data = null,
    status = true,
    message = "Your Message",
    code = 200,
    ...args
) => {
    return { data: data, status: status, message: message, code: code, ...args};
};

const createError = (
    code = 200,
    message = "Error Message",
    status = false,
    data = null,
    error = null,
) => {
    return { code: code, status: status, message: message, data: data, error: error };
}


function validateError(fields, data) {
    let errorFields = [];
    for(const field of fields) {

        if(!data[field]) { // Field isn't present, end request
            errorFields.push(`${field} is missing`);
        }
    }
    if(errorFields.length){

        return  createError(200, 'Please fill all required fields', false, [], JSON.stringify(errorFields))

    }

    return false;
}


async function requestPagination(data) {
  if (data.pagination) {

        const defaultPerPage = 10;
        const defaultPage = 1;
        const perPage = data.pagination.perPage ? data.pagination.perPage : defaultPerPage;
        const page = data.pagination.page ? data.pagination.page : defaultPage;

        const paginateData = {
            skip: (page - 1)*perPage,
            take: perPage,
        }

        return paginateData;

    }

    return {};
}
function returnPagination(data, total) {
    if (data.pagination) {

        const defaultPerPage = 10;
        const defaultPage = 1;
        const perPage = data.pagination.perPage ? data.pagination.perPage : defaultPerPage;
        const page = data.pagination.paeg ? data.pagination.page : defaultPage;


        const paginateData = {
            currentPage: (page - 1)(perPage),
            perPage: perPage,
            total: total / perPage,
        }

        return paginateData;

    }
}

const seprateUserBusinessFields = (data) => {
    const BusinessKeys = ['businessName', 'description', 'address', 'category', 'subCategory', 'website']
    var businessData = {}
    for(var i =0; i <= BusinessKeys.length; i++) {
        if(data[BusinessKeys[i]]) {
            businessData[BusinessKeys[i]] = data[BusinessKeys[i]]
            console.log("businessData", businessData)
            delete data[BusinessKeys[i]]
        }
    }
    console.log("businessData out", businessData)
    return {user: data, business: businessData}
}


function customString(length = 8) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
module.exports= {
    createResponse,
    createError,
    validateError,
    requestPagination,
    returnPagination,
    seprateUserBusinessFields,
    customString
}
  