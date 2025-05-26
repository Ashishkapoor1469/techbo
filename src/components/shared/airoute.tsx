import Link from "next/link";
import { Button } from "../ui/button";
import { Brush } from "lucide-react";

export default function airoute(){
    return(
        <>
        <Button className=" md:hidden block fixed bottom-20 right-4 z-50 bg-primary text-white hover:bg-primary/90 transition-colors" asChild>
            {/* Using Link to navigate to recommendations page */}
            <Link href={"/recommendations"} className="flex items-center gap-2">
            <Brush className="h-4 w-4" />
            </Link>
        </Button>
        </>
    )
}