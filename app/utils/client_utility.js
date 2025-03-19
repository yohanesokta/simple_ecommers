"use client"
export function formated_date (date_string){
    const date = new Date(date_string)
    return date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" });
}
export function convertIndonesianNumber(number){
    if (number[0] == "0") {
        return number.replace(/^08/, "+628");
    } else {
        return number
    }
}