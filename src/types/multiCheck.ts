export type Option = {
    label: string,
    value: string
}

export type Props = {
    label?: string,
    options: Option[],
    columns?: number,
    values: string[]
    onChange: (options: Option[]) => void,
}

export interface MultiCheckContextValue {
    values: string[],
    options: Option[],
    onChange: (options: Option[]) => void
}

export type CheckboxProps = {
    label: string,
    value: string,
    onCheckboxChange?:(event:React.ChangeEvent<HTMLInputElement>)=> void,
    checked?: boolean,
    selectAllFlag?: boolean,
}