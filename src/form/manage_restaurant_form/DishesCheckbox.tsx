import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormItem, FormLabel } from "../../components/ui/form";
import { Checkbox } from "../../components/ui/checkbox";

type props = {
    dish: string;
    field: ControllerRenderProps<FieldValues, "dishes">;
};

//field.value = the list of the dishes that the user selected ["chinese", "burmese", "noodles"]
// dish = "burmese"

export const DishesCheckbox = ({dish, field}: props) => {
  return (
    <FormItem className="mt-2 space-x-1 space-y-0 flex flex-row items-center">
        <FormControl>
            <Checkbox 
            className="bg-white" 
            checked={field.value.includes(dish)}
            onCheckedChange={(checked) => {
                if(checked) {
                    field.onChange([...field.value, dish]);
                }
                else {
                    field.onChange(field.value.filter((value: string) => value !== dish))
                }
            }}
            />
        </FormControl>
        <FormLabel className="text-sm font-normal">{dish}</FormLabel>
    </FormItem>
  )
}
