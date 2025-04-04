export default class FetchError extends Error {
    constructor(message = ""){
        super(message);
        this.message = "Fetch error: " + message;
        this.name = "FetchError";
        this.stack = (new Error()).stack;
    }
}
