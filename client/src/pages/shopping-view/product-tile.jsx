import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"; // Common icons
import { Link } from "react-router-dom";

// export function ShopppingProductTile({ product }) {
//     // Default to the first image
//     const imageUrl = product.images?.[0]
//         ? `${import.meta.env.VITE_IMAGE_URL}/${product.images[0]}`
//         : "https://via.placeholder.com/400x300"; // Fallback image

//     return (
//         <Card className="w-full max-w-sm overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out flex flex-col">

//             {/* --- Image & Badge --- */}
//             <div className="relative">
//                 <a href="#">
//                     <img
//                         className="w-full h-60 object-cover"
//                         src={imageUrl}
//                         alt={product.title} // Added alt text for accessibility
//                     />
//                 </a>
//                 <Badge
//                     variant="default" // You can change this to "secondary" or "outline"
//                     className="absolute top-3 right-3"
//                 >
//                     {product.subCategory.name}
//                 </Badge>
//             </div>

//             {/* --- Product Info --- */}
//             {/* Using flex-grow pushes the footer to the bottom */}
//             <div className="p-6 flex-grow flex flex-col">
//                 <CardHeader className="p-0 mb-4">
//                     <CardTitle className="text-xl font-semibold leading-tight truncate">
//                         {product.title}
//                     </CardTitle>
//                 </CardHeader>

//                 <CardContent className="p-0 flex-grow">
//                     {/* Price is now more prominent */}
//                     <div className="mb-3">
//                         <span className="text-2xl font-bold text-gray-900">
//                             ₹{product.price}
//                         </span>
//                         {/* You could add an old price here if available */}
//                         {/* <span className="text-sm text-gray-500 line-through ml-2">₹{product.oldPrice}</span> */}
//                     </div>

//                     <CardDescription className="text-sm text-gray-600 line-clamp-3">
//                         {product.description}
//                     </CardDescription>
//                 </CardContent>
//             </div>

//             {/* --- Action Buttons --- */}
//             <CardFooter className="p-4 bg-gray-50 border-t">
//                 <div className="grid grid-cols-2 gap-3 w-full">
//                     <Button variant="outline">
//                         <ShoppingCart className="mr-2 h-4 w-4" />
//                         Add to Cart
//                     </Button>
//                     <Button>
//                         <Zap className="mr-2 h-4 w-4" />
//                         Buy Now
//                     </Button>
//                 </div>
//             </CardFooter>
//         </Card>
//     );
// }

// Helper component for star ratings (you can put this in a separate file)
const StarRating = ({ rating, count }) => {
    return (
        <div className="flex items-center gap-1">
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                ))}
            </div>
            {count && <span className="text-xs text-gray-500">({count})</span>}
        </div>
    );
};

export function ShopppingProductTile({ product }) {
    const imageUrl = product.images?.[0]
        ? `${import.meta.env.VITE_IMAGE_URL}/${product.images[0]}`
        : "https://via.placeholder.com/400x300"; // Fallback image

    return (
        <Link to={`/shop/product/${product.id}`} className="block">
            <Card className="w-full max-w-sm mx-auto">
                <div >
                    <div className="relative">
                        <img
                            src={imageUrl}
                            alt={product?.title}
                            className="w-full h-[300px] object-cover rounded-t-lg"
                        />
                        {product?.totalStock === 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Out Of Stock
                            </Badge>
                        ) : product?.totalStock < 10 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                {`Only ${product?.totalStock} items left`}
                            </Badge>
                        ) : product?.salePrice > 0 ? (
                            <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600">
                                Sale
                            </Badge>
                        ) : null}
                    </div>
                    <CardContent className="p-4">
                        <h2 className="text-xl font-bold mb-2">{product?.title}</h2>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[16px] text-muted-foreground">
                                {product?.subCategory?.name}
                            </span>
                            <span className="text-[16px] text-muted-foreground">
                                {product?.brand}
                            </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span
                                className={`${product?.salePrice > 0 ? "line-through" : ""
                                    } text-lg font-semibold text-primary`}
                            >
                                ${product?.price}
                            </span>
                            {product?.salePrice > 0 ? (
                                <span className="text-lg font-semibold text-primary">
                                    ${product?.salePrice}
                                </span>
                            ) : null}
                        </div>
                    </CardContent>
                </div>
                <CardFooter>
                    {product?.totalStock === 0 ? (
                        <Button className="w-full opacity-60 cursor-not-allowed">
                            Out Of Stock
                        </Button>
                    ) : (
                        <Button
                            // onClick={}
                            className="w-full"
                        >
                            Add to cart
                        </Button>
                    )}
                </CardFooter>
            </Card>
        </Link>
    );
}