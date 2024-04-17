import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { LoadingButton } from "../../components/LoadingButton";
import { User } from "../../types";
import { useEffect } from "react";

const formSchema = z.object({
    email: z.string().optional(),
    name: z.string().min(1, "Name is required"),
    addressLine1: z.string().min(1, "Address Line 1 is required"),
    addressLine2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),

});

type userFormData = z.infer<typeof formSchema>;

type props = {
    onSave: (userProfileData : userFormData) => void;
    isLoading: boolean;
    userData: User;

};

export const UserProfileForm = ({onSave, isLoading, userData}: props) => {
    const form = useForm<userFormData>({
        resolver: zodResolver(formSchema),   // for validation
        defaultValues: userData,
    });

    useEffect(() => {
        form.reset(userData);
    },[userData, form]);

    return(
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSave)}
            className="bg-gray-50 space-y-4 rounded-lg p-6 md:p-10 text-blue-900 "
            >
                <div>
                    <h2 className="font-bold text-xl md:text-2xl mb-1">User Profile</h2>
                    <FormDescription>
                        View or update your profile information here.
                    </FormDescription>
                </div>

                <FormField 
                control={form.control} 
                name="email" 
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" disabled/>
                        </FormControl>
                    </FormItem>
                )} />

                <FormField 
                control={form.control} 
                name="name" 
                render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input {...field} className="bg-white" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />

                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                    <FormField 
                    control={form.control} 
                    name="addressLine1" 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField 
                    control={form.control} 
                    name="addressLine2" 
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Address Line 2</FormLabel>
                            <FormControl>
                                <Input {...field} className="bg-white" />
                            </FormControl>
                        </FormItem>
                    )} />

                    <FormField 
                    control={form.control} 
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
                    control={form.control} 
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

                {isLoading
                ? <LoadingButton />
                : <Button type="submit" className="text-white bg-blue-900">Submit</Button>}

            </form>
        </Form>
    )
};