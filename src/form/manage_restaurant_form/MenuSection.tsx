import { useFieldArray, useFormContext } from "react-hook-form"
import { FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Button } from "../../components/ui/button";
import { MenuItemInput } from "./MenuItemInput";

export const MenuSection = () => {
    const {control} = useFormContext();

    // fields = list of all the current menu items
    const {fields, append, remove} = useFieldArray({
        control,
        name:"menuItems",

    });

  return (
    <div className="space-y-4">
        <div>
            <h2 className="font-bold text-xl md:text-2xl mb-1">Menu</h2>
            <FormDescription>
                Create your menu
            </FormDescription>
        </div>

        <FormField
        control={control} 
        name="menuItems" 
        render={() => (
            <FormItem className="flex flex-col gap-2">
                {fields.map((_, index) => (
                    <MenuItemInput
                    index={index} 
                    removeMenuItem={()=>remove(index)}
                />))}
            </FormItem>
        )} />
        <Button 
        type="button" 
        className="bg-blue-900 font-bold max-h-fit hover:bg-slate-600"
        onClick={() => append({name: "", price: ""})}>
            Add item
        </Button>
    </div>
  )
}
