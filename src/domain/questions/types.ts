export type Question={
    id:string,
    text:string,
    required:boolean,
    answerType:"string" | "number" | "boolean" | "date" | "enum" | "select" | "text",
    options?:string[],
    mapsTo?:string,
    affects?:string[],
}

