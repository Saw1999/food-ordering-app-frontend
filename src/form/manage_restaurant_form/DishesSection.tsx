import { useFormContext } from "react-hook-form"
import { FormDescription, FormField, FormItem,  FormMessage } from "../../components/ui/form";
import { dishesList } from "../../config/resta-options-config";
import { DishesCheckbox } from "./DishesCheckbox";

export const DishesSection = () => {
    const {control} = useFormContext();

  return (
    <div className="space-y-2">
        <div>
            <h2 className="font-bold text-xl md:text-2xl mb-1">Dishes</h2>
            <FormDescription>
                Select the dishes that your restaurant serves
            </FormDescription>
        </div>

        <FormField
        control={control} 
        name="dishes" 
        render={({field}) => (
            <FormItem>
                <div className="grid grid-cols-4 md:grid-cols-5 gap-1">
                    {dishesList.map((dishItem) => (
                        <DishesCheckbox field={field} dish={dishItem}/>
                    ))}
                </div>
                <FormMessage />
            </FormItem>
        )} />
    </div>
  )
}
