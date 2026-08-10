export const formateDate = (date:string)=>new Date(date).toLocaleDateString("en-IN",{
    day : "2-digit",
    month : "short",
    year : "numeric"
})