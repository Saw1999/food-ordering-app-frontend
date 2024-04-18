import { useFormContext } from "react-hook-form"
import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { AspectRatio } from "../../components/ui/aspect-ratio";

export const ImageSection = () => {
    const {control, watch} = useFormContext();
    const existingImageUrl = watch("imageUrl");

  return (
    <div className="space-y-4">
        <div>
            <h2 className="font-bold text-xl md:text-2xl mb-1">Image</h2>
            <FormDescription>
                Upload an image that will be displayed on your restaurant listing in the search results
            </FormDescription>
        </div>

        <div className="md:w-[50%] flex flex-col gap-8">
            {existingImageUrl && (
                <AspectRatio ratio={16/9}>
                    <img src={existingImageUrl} className="object-cover w-full h-full rounded-md" />
                </AspectRatio>
            )}
            <FormField
            control={control} 
            name="imageFile" 
            render={({field}) => (
                <FormItem>
                    <FormControl>
                        <Input 
                        type="file" 
                        className="bg-white" 
                        accept=".jpg, .jpeg, .png, .svg"
                        onChange={(e) => field.onChange(e.target.files
                                                        ? e.target.files[0] 
                                                        : null)}    
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} 
            />

        </div>
    </div>

  )
}
