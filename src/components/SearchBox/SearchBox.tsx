import css from "./SearchBox.module.css";

interface SearchBoxProps{
    value: string | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SearchBox({ value, onChange }: SearchBoxProps) {

    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            defaultValue={value}
            onChange={ onChange }
        />

    )
    
}