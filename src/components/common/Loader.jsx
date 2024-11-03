import {Skeleton} from "@/components/ui/skeleton.jsx";

function Loader() {
    return (
        <Skeleton className="w-[800] bg-black h-[600px]">
            <h1 className="flex items-center justify-center h-screen"> Loading.....</h1>
        </Skeleton>
    )
}

export default Loader;