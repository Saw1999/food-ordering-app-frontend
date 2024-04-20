import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type Props = {
    sortOption: string;
    onChange: (value: string) => void;
};

const SORT_OPTION_LIST = [
    {
        label: "Best match",
        value: "bestMatch"
    },
    {
        label: "Delivery Fee",
        value: "deliFee"
    },
    {
        label: "Estimated Delivery Time",
        value: "estiDeliTime"
    },
];


export const SortOptionDropDown = ({sortOption, onChange}: Props) => {
    const selectedSortOptionLabel = SORT_OPTION_LIST.find((option) => option.value === sortOption)?.label || SORT_OPTION_LIST[0].label;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
                <Button variant="outline" className="w-full text-blue-900 font-bold">
                    Sort by: {selectedSortOptionLabel}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                {SORT_OPTION_LIST.map((option) => (
                    <DropdownMenuItem className="cursor-pointer text-slate-600" onClick={() => onChange(option.value)}>
                    {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
