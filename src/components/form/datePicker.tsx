"use client"

import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import * as React from "react"

import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"
import { State } from "./hooks"

export default function DatePicker({ title, name, dateHandler }: { title: string, name: string, dateHandler: State<Date> }) {
	const { value: date, set: setDate } = dateHandler

	return (<>
		<input type="hidden" name={name} value={date ? format(date, "yyyy-MM-dd") : ""} />
		<Popover>
			<PopoverTrigger asChild>
				<Button
					name={name}
					variant={"outline"}
					className={cn(
						"w-auto justify-start text-left font-normal",
						!date && "text-muted-foreground"
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP", { locale: ptBR }) : <span>{title}</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0">
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
					locale={ptBR}
				/>
			</PopoverContent>
		</Popover>
	</>
	)
}
