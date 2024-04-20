import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { dishesList } from "../config/resta-options-config";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";
import { Button } from "./ui/button";

type Props = {
    selectedDishes: string[];
    onChange: (dishes: string[]) => void;
    isExpanded: boolean;
    onExpandedClick: () => void;
}

export const DishesFilter = ({selectedDishes, onChange, isExpanded, onExpandedClick}: Props) => {
    const handleDishesChange = (e: ChangeEvent<HTMLInputElement>) =>{
        const clickedDish = e.target.value;
        const isChecked = e.target.checked;
        
        const newDishesList = isChecked 
                            ? [...selectedDishes, clickedDish] 
                            : selectedDishes.filter((dish)=> dish !== clickedDish);

        onChange(newDishesList);
    };

    const handleDishesFilterReset = () => onChange([]);

    return (
        <>
            <div className="px-2 flex items-center justify-between text-blue-900">
                <div className="mb-2 font-semibold md:text-lg">Filter by Dishes</div>
                <div 
                className="mb-2 font-semibold text-sm underline text-slate-600 cursor-pointer"
                onClick={handleDishesFilterReset}>
                    Reset Filters
                </div>
            </div>

            <div className="flex flex-col space-y-2">

                {dishesList
                .slice(0, isExpanded ? dishesList.length : 7)
                .map((dish, index) => {
                    const isSelected = selectedDishes.includes(dish);
                    return <div key={index} className="flex text-blue-900">
                        <input
                        id={`dish_${dish}`} 
                        type="checkbox"
                        className="hidden"
                        value={dish}
                        checked={isSelected}
                        onChange={handleDishesChange}
                        />

                        <Label
                        htmlFor={`dish_${dish}`}
                        className={`text-sm font-semibold px-4 py-2 flex items-center flex-1 cursor-pointer rounded-full ${isSelected ? "text-green-700 border border-green-700" : "border border-slate-300"}`}>
                            {isSelected && <Check size={20} strokeWidth={3} />}
                            {dish}
                        </Label>
                    </div>
                })}

                <Button 
                variant="link" 
                className="mt-4 flex-1"
                onClick={onExpandedClick}>
                    {isExpanded ? (
                    <span className="flex items-center text-blue-900">
                        View Less
                        <ChevronUp />
                    </span>) : (
                    <span className="flex items-center text-blue-900">
                        View More
                        <ChevronDown />
                    </span>
                    )}
                </Button>
            </div>
        </>
    )
}
