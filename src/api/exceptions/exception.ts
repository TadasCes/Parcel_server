class HttpException extends Error {
    status!: number;
    message!: string;
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = "Error code: " + status + ": "+message;
    }
}

export default HttpException;