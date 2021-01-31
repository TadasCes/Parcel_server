import { Request, Response } from 'express';
import { NextFunction } from "express";
import HttpException from "../exceptions/exception";


function errorMiddleWare(error, req, res){
    const status = error.status || 500;
    const message = error.message || "Something went wrong";
    res.status(status).json({
        status,
        message
    })
}

export default errorMiddleWare;