import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../../components/ui/form";
import { DetailSection } from "./DetailSection";
import { Separator } from "../../components/ui/separator";
import { DishesSection } from "./DishesSection";
import { MenuSection } from "./MenuSection";
import { ImageSection } from "./ImageSection";
import { LoadingButton } from "../../components/LoadingButton";
import { Button } from "../../components/ui/button";
import { Restaurant } from "../../types";
import { useEffect } from "react";

const formSchema = z.object({
    restaurantName: z.string({required_error: "Restaurant name is required!"}),
    suburb: z.string({required_error: "Suburb is required!"}),
    city: z.string({required_error: "City is required!"}),
    country: z.string({required_error: "Country is required!"}),
    deliFee: z.coerce.number({
        required_error: "Delivery Fee is required!",
        invalid_type_error: "Must be a positive number!"
    }),
    estiDeliTime: z.coerce.number({
        required_error: "Delivery Time is required!",
        invalid_type_error: "Must be a positive integer!"
    }),
    dishes: z.array(z.string()).nonempty({message: "Please select at least one dish."}),
    menuItems: z.array(z.object({
        name: z.string().min(1, "Menu item's name is required!"),
        price: z.coerce.number().min(1, "Price is required!"),
    })),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, {message: "Image is required!"}).optional(),
}).refine((schemaData) => schemaData.imageUrl || schemaData.imageFile, {
    message: "Either image url or image file must be provided!",
    path: ["imageFile"],
})

type RestaFormData = z.infer<typeof formSchema>;

type Props = {
    onSave: (restaFormData: FormData) => void;
    isLoading: boolean;
    restaurant?: Restaurant;

}

export const ManageRestaForm = ({onSave, isLoading, restaurant}: Props) => {
    const form = useForm<RestaFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            dishes: [],
            menuItems: [{name: "", price: 0}],
        },
    });

    useEffect(()=>{
        if(!restaurant){
            return
        }

        //convering string to int
        // const formattedDeliFee = parseInt((restaurant.deliFee).toFixed(2));
        
        // const formattedMenuItems = restaurant.menuItems.map((item)=> ({
        //     ...item, 
        //     price: parseInt((item.price).toFixed(2)),
        // }));
        
        form.reset(restaurant);
    },[form, restaurant]);

    const onSubmit = (formDataJson: RestaFormData) => {

        // covert formData Json to formData Object
        const formData = new FormData();
        formData.append("restaurantName", formDataJson.restaurantName);
        formData.append("suburb", formDataJson.suburb);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("deliFee", formDataJson.deliFee.toString());
        formData.append("estiDeliTime", formDataJson.estiDeliTime.toString());
        formDataJson.dishes.forEach((dish, index)=>{
            formData.append(`dishes[${index}]`, dish);
        });
        formDataJson.menuItems.forEach((item, index)=> {
            formData.append(`menuItems[${index}][name]`, item.name);
            formData.append(`menuItems[${index}][price]`, item.price.toString());
        });

        if (formDataJson.imageFile){
            formData.append(`imageFile`, formDataJson.imageFile);
        };

        onSave(formData);
    };

    return(
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="bg-gray-50 space-y-4 rounded-lg p-6 md:p-10 text-blue-900"
            >
                <DetailSection />
                <Separator />
                <DishesSection />
                <Separator />
                <MenuSection />
                <Separator />
                <ImageSection />

                {isLoading 
                ? <LoadingButton /> 
                : <Button type="submit" className="bg-blue-900 font-bold max-h-fit hover:bg-slate-600">Submit</Button>}
            </form>

        </Form>
    )
}
