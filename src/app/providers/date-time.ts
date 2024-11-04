import { format } from "date-fns"

export function toDateString(date: Date) {
    return format(date, "yyyy-MM-dd")
}