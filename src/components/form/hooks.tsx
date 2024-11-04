import { useState } from "react";

export type State<T> = {
	value?: T;
	set: React.Dispatch<React.SetStateAction<T | undefined>>;
};

export type Form = {
	date: State<Date>;
	quantity: State<number>;
	tags: State<string[]>;
	note: State<string>;
};

export const tagHandler = (tag: State<string[]>) => {
	const { value: tags, set: setTags } = tag
	const [inputValue, setInputValue] = useState<string>('')

	const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && inputValue) {
			e.preventDefault()
			if (!tags?.includes(inputValue.trim())) {
				setTags([...(tags || []), inputValue.trim()])
			}
			setInputValue('')
		}
	}

	const removeTag = (tagToRemove: string) => {
		if (tags?.includes(tagToRemove))
			setTags(tags.filter(tag => tag !== tagToRemove))
	}

	return { tags, handleInputKeyDown, inputValue, setInputValue, removeTag }
}

export const formHandler = () => {
	const [date, setDate] = useState<Date | undefined>(new Date);
	const [quantity, setQuantity] = useState<number | undefined>();
	const [tags, setTags] = useState<string[] | undefined>([]);
	const [note, setNote] = useState<string | undefined>("");

	const resetFormState = () => {
		setDate(new Date);
		setQuantity(undefined);
		setTags(undefined);
		setNote(undefined);
	};

	const form: Form = {
		date: { value: date, set: setDate },
		quantity: { value: quantity, set: setQuantity },
		tags: { value: tags, set: setTags },
		note: { value: note, set: setNote },
	};

	return { form, resetFormState }
}