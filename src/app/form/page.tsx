"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import DatePicker from "@/components/ui/datePicker"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Tags } from "lucide-react"

export default function CardWithForm() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Incluir Dados</CardTitle>
          <CardDescription className="text-xs">Inclua ou edite uma contagem diária</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
                <DatePicker title="Escolha uma data" />
                <Label htmlFor="quantity">Quantidade</Label>
                <Input className="w-auto"
                  type="number"
                  placeholder="Quantidade"
                />
                <Tags className="w-auto" />
                <Button variant={"ghost"}>Adicionar uma Nota</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  )
}