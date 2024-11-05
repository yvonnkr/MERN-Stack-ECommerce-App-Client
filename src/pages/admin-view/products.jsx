import {Fragment, useState} from "react";
import {Button} from "@/components/ui/button.jsx";
import {Sheet, SheetContent, SheetHeader, SheetTitle} from "@/components/ui/sheet.jsx";
import {Description} from "@radix-ui/react-dialog";
import CommonForm from "@/components/common/form.jsx";
import {addProductFormElements} from "@/config/index.js";
import ProductImageUpload from "@/components/admin-view/image-upload.jsx";

const initialFormData = {
    image: null,
    title: "",
    description: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    totalStock: "",
    averageReview: 0,
};

function AdminProducts() {
    const [openCreateProductsDialog, setOpenCreateProductsDialog] = useState(false);
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const [currentEditedId, setCurrentEditedId] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
    }

    return (
        <Fragment>
            <div className="mb-5 w-full flex justify-end">
                <Button onClick={() => setOpenCreateProductsDialog(true)}>
                    Add New Product
                </Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
            <Sheet open={openCreateProductsDialog} onOpenChange={() => setOpenCreateProductsDialog(false)}>
                <SheetContent side="right" className="overflow-auto">
                    <SheetHeader>
                        <SheetTitle>
                            Add New Product
                        </SheetTitle>
                        <ProductImageUpload
                            imageFile={imageFile}
                            setImageFile={setImageFile}
                            uploadedImageUrl={uploadedImageUrl}
                            setUploadedImageUrl={setUploadedImageUrl}
                            setImageLoadingState={setImageLoadingState}
                            imageLoadingState={imageLoadingState}
                            isEditMode={currentEditedId !== null}
                        />
                        <div className="py-6">
                            <CommonForm
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText={"Add"}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <Description className="sr-only">Add new product panel</Description>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        </Fragment>
    );
}

export default AdminProducts;