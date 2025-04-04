export default class FetchError extends Error {
    constructor(message = ""){
        super(message);
        this.message = "Twitch authentication error: " + message;
        this.name = "FetchError";
        this.stack = (new Error()).stack;
    }
}
