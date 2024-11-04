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
import DatePicker from "@/components/form/datePicker"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Taginput from "@/components/form/tagInput"
import { formHandler } from "@/components/form/hooks"
import { useToast } from "@/hooks/use-toast"
import { submitForm } from "@/app/actions/entries"
export default function FormContainer() {
    const { form, resetFormState } = formHandler();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        await submitForm(formData);
        toast({
          title: "Contagem adicionada",
          description: "Seu registro foi adicionado com sucesso",
        });
        resetFormState();
      };
      

    return (
        <div className="flex h-full w-full items-center justify-center">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Incluir Contagem</CardTitle>
                    <CardDescription className="text-xs">Inclua ou edite uma contagem diária</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-6">
                            <DatePicker
                                name="date"
                                dateHandler={form.date}
                                title="Escolha uma data"
                            />
                            <Input
                                className="w-auto"
                                type="number"
                                name="quantity"
                                placeholder="Quantidade"
                                value={form.quantity.value !== undefined ? form.quantity.value : ''}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const numberValue = value !== '' ? parseFloat(value) : undefined;
                                    form.quantity.set(numberValue);
                                }}
                            />
                            <Taginput name="tags" tagsState={form.tags} />
                            <Textarea
                                name="note"
                                placeholder="Quer deixar uma nota?"
                                onChange={e => form.note.set(e.currentTarget.value)}
                            />
                            <CardFooter className="flex justify-between">
                                <Button onClick={resetFormState} type="button" variant="outline">Limpar</Button>
                                <Button type="submit">Enviar</Button>
                            </CardFooter>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>

    )
}