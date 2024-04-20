import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useEffect } from "react";

const searchFormSchema = z.object({
    searchQuery: z.string({required_error: "Restaurant name is required!"}),
});

export type SearchForm = z.infer<typeof searchFormSchema>;

type Props ={
    onSubmit: (searchFormData: SearchForm) => void;
    placeholder: string;
    onReset?: () => void;
    searchQuery?: string;
}

export const SearchBox = ({onSubmit, placeholder, onReset, searchQuery}: Props) => {
    const searchForm = useForm<SearchForm>({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            searchQuery,
        },
    });

    useEffect(()=>{
        searchForm.reset({searchQuery});
    },[searchForm, searchQuery]);

    const handleReset= () => {
        searchForm.reset({
            searchQuery:"",
        });

        if(onReset){
            onReset();
        }

    };


    return (
        <Form {...searchForm}>
            <form
            onSubmit={searchForm.handleSubmit(onSubmit)} 
            className={`border-2 px-3 py-1 md:py-2 lg:py-3 mx-3 md:mx-0 flex justify-between items-center gap-3 rounded-full ${searchForm.formState.errors.searchQuery && "border-red-500"}`}>

                <Search className="hidden md:block ml-1 text-blue-900" strokeWidth={2.5} size={30} />
                <FormField 
                control={searchForm.control}
                name="searchQuery"
                render={({field}) => (
                    <FormItem className="flex-1">
                        <FormControl>
                            <Input {...field} 
                            className="text-l md:text-xl border-none focus-visible:ring-0 shadow-none"
                            placeholder={placeholder}
                            />
                        </FormControl>
                    </FormItem>
                )}
                />
                
                <Button 
                type="button"
                variant="outline" 
                className="rounded-full h-7 md:h-full text-blue-900"
                onClick={handleReset}
                >
                    Reset
                </Button>

                <Button type="submit" className="bg-blue-900 hover:bg-slate-600 md:font-bold rounded-full h-7 md:h-full">Search</Button>
            </form>
        </Form>
  )
}
