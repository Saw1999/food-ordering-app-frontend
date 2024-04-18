import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

type props ={
    index: number;
    removeMenuItem: () => void;
}

export const MenuItemInput = ({index, removeMenuItem}: props) => {
    const {control} = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
        <FormField 
        control={control}
        name={`menuItems.${index}.name`}
        render={({field}) => (
            <FormItem>
                <FormLabel className="flex items-center gap-1">
                    Name
                    <FormMessage />
                </FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" placeholder="Mohinga"/>
                </FormControl>
            </FormItem>
        )}
        />

        <FormField 
        control={control}
        name={`menuItems.${index}.price`}
        render={({field}) => (
            <FormItem>
                <FormLabel className="flex items-center gap-1">
                    Price ($)
                    <FormMessage />
                </FormLabel>

                <FormControl>
                    <Input {...field} className="bg-white" placeholder="12.00"/>
                </FormControl>
                
            </FormItem>
        )}
        />

        <Button
        type="button" 
        className="bg-blue-900 font-bold max-h-fit hover:bg-slate-600" 
        onClick={removeMenuItem}>
            Remove
        </Button>

    </div>
  )
}
