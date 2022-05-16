import CheckToken from "../utils/check-token";

export const REQUEST_TYPE = {
    GET: 'GET',
    POST: 'POST',
    PUT: "PUT"
}
export const headers = {
    'Content-Type': 'application/json',
    'auth_token': CheckToken()
};

export async function fetchData(url, postData, type) {

    return await fetch(url, {
        method: type,
        body: JSON.stringify(postData),
        headers: headers
    }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return handleSuccess(response)
        } else {
            handleErrors(response)
        }
    }).then((result) => { return result }).catch((error) => {
        return error;
    });
}

export async function fetchPutData(url, postData, type) {

    return await fetch(url, {
        method: type,
        body: JSON.stringify(postData),
        headers: headers
    }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return handleSuccess(response)
        } else {
            handleErrors(response)
        }
    }).then((result) => { return result }).catch((error) => {
        return error;
    });
}


export async function fetchReadData(url, type) {

    return await fetch(url, {
        method: type,
        headers: headers
    }).then((response) => {
        if (response.status === 200 && response.status <= 299) {
            return handleSuccess(response)
        } else {
            handleErrors(response)
        }
    }).then((result) => { return result }).catch((error) => {
        return error;
    });
}

export async function fetchReadSignInData(url, type, username_password) {

    return await fetch(url, {
        method: type,
        headers:  {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${window.btoa(username_password)}`
        }
    }).then((response) => {
        if (response.status >= 200 && response.status <= 299) {
            return handleSuccess(response)
        } else {
            return handleErrors(response)
        }
    }).then((result) => { return result }).catch((error) => {
        return error;
    });
}

export async function handleSuccess(response) {
    const result = await response.json();
    return result
}

export async function handleErrors(response) {
    // return await response.json().then(response => { throw new Error(response.error) })
    const result = await response.json();
    return result
}
