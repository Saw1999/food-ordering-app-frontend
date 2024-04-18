import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form"
import { Input } from "../../components/ui/input"

export const DetailSection = () => {
    const {control} = useFormContext();

  return (
    <div className="space-y-2">
        <div>
            <h2 className="font-bold text-xl md:text-2xl mb-1">Restaurant Details</h2>
            <FormDescription>
                Enter the information about your restaurant
            </FormDescription>
        </div>
        <FormField
        control={control} 
        name="restaurantName" 
        render={({field}) => (
            <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />

        <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
            <FormField
            control={control} 
            name="suburb" 
            render={({field}) => (
                <FormItem>
                    <FormLabel>Suburb</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <FormField
            control={control} 
            name="city" 
            render={({field}) => (
                <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />

            <FormField
            control={control} 
            name="country" 
            render={({field}) => (
                <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                        <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
        </div>

        <FormField
        control={control} 
        name="deliFee" 
        render={({field}) => (
            <FormItem className="max-w-[25%]">
                <FormLabel>Delivery Fee ($)</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" placeholder="1.20"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />

        <FormField
        control={control} 
        name="estiDeliTime" 
        render={({field}) => (
            <FormItem className="max-w-[25%]">
                <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                <FormControl>
                    <Input {...field} className="bg-white" placeholder="20"/>
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />

    </div>
  )
}
