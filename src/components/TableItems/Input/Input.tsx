/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDebounce } from "../../../hooks/useDebounce";
import cls from "./Input.module.scss";
import { ChangeEvent, InputHTMLAttributes, memo, useRef } from "react";

type HTMLInputProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
	value?: string | number;
	onChange?: (value: string) => void;
}

export const Input = memo((props: InputProps) => {
	const { value, onChange, type = "text", placeholder, ...otherProps } = props;
	const ref = useRef<HTMLInputElement>(null);

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value);
		console.log(e.target.value);
	};

	const debounceChangeHandler = useDebounce(onChangeHandler, 500);

	const onBlurHandler = () => {
		if (ref.current) {
			ref.current.value = ""; // Очищаем значение инпута
		}
	};

	return (
		<div className={cls.inputWrapper}>
			<input
				ref={ref}
				type={type}
				value={value}
				onChange={debounceChangeHandler}
				className={cls.input}
				{...otherProps}
				placeholder={placeholder}
				onBlur={onBlurHandler}
				inputMode="numeric"
			/>
		</div>
	);
});
