import { Loader2 } from "lucide-react"
import { Button } from "./ui/button"

export const LoadingButton = () => {
  return (
    <Button disabled>
        <Loader2 className="animate-spin w-4 h-4 mr-2" />
        Loading
    </Button>
  )
}
