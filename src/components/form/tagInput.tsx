'use client'

import { X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { tagHandler, State } from "./hooks"

export default function Taginput({ name, tagsState }: { name: string, tagsState: State<string[]> }) {
	const { tags, handleInputKeyDown, inputValue, setInputValue, removeTag } = tagHandler(tagsState);

	return (<>
		<input type="hidden" name={name} value={tags} />
		<div className="flex flex-col w-full">
			<Input
				type="text"
				placeholder="Adicione tags"
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				onKeyDown={handleInputKeyDown}
				className="w-full"
			/>
			<div className="flex gap-2 mt-2 h-16 w-full flex-wrap overflow-auto border border-gray-300 rounded-md p-2">
				{
					tags && tags.length > 0 ?
						tags.map(tag => (
							<div key={tag} className="h-8 bg-lime-800 text-primary-foreground px-2 py-1 rounded-md flex items-center">
								<span>{`${tag.substring(0, 20)}${tag.length > 20 ? '...' : ''}`}</span>
								<button onClick={() => removeTag(tag)} className="ml-1 focus:outline-none">
									<X size={14} />
								</button>
							</div>
						))
						: <span className="text-gray-300 text-sm">Nenhuma tag adicionada...</span>
				}
			</div>
		</div>
	</>
	)
}
