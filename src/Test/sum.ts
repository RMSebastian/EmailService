import { NextFunction } from "express";

export function sum(a: number, b: number): number{
    return a + b;
}
export function myThrowFunction(){
    throw new Error("InvalidInput")
}

export function CallbackFunction(next: NextFunction){
    setTimeout(()=>{
        next("Gay");
    },1000);
}
export async function PromiseFunction(): Promise<string>{
    return new Promise((resolves, rejects)=>{
        setTimeout(()=>{
            resolves("Gays");
        },1000)
    });
}