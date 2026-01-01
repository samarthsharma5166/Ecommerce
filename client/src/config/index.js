export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    componentType: "input",
    placeholder: "Enter your username",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    componentType: "input",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    placeholder: "Enter your password",
    type: "password",
  },
]
export const loginformControls = [
  
  {
    name: "email",
    label: "Email",
    componentType: "input",
    placeholder: "Enter your email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    componentType: "input",
    placeholder: "Enter your password",
    type: "password",
  },
]

export const addProductFormElements=[
  {
    label:'Title',
    name:"title",
    componentType:"input",
    type:"text",
    placeholder:"enter product title",
  },{
    label:"Description",
    name:"description",
    componentType:"textarea",
    placeholder:"enter product description",

  },
{
  label:"Category",
  name:"category",
  componentType:"select",
  options:[
    {id:"men",label:"Men"},
    {id:"women",label:"Women"},
    {id:"kids",label:"Kids"},
    {id:"accessories",label:"Accessories"},
    {id:"footwear",label:"Footwear"},
  ]
},
{
  label:"Brand",
  name:"brand",
  componentType:"select",
  options:[
    {id:"nike",label:"Nike"},
    {id:"adidas",label:"Adidas"},
    {id:"puma",label:"Puma"},
    {id:"levi",label:"Levi"},
    {id:"zara",label:"Zara"},
    {id:"h&m",label:"H&M"},
  ]
},{
  label:"Price",
  name:"price",
  componentType:"input",
  type:"number",
  placeholder:"Enter product price"

},
{
  label:"Sale Price",
  name:"salePrice",
  componentType:"input",
  type:"number",
  placeholder:"enter sale price (optional)"
},
{
  label:"Total Stock",
  name:"total Stock",
  componentType:"input",
  type:"number",
  placeholder:"enter total stock"
}

]


export  const shoppingViewHeaderMenuItems=[
  {
    id:'home',
    label:"Home",
    path:"/shop/home"

  },
  {
    id:'men',
    label:"Men",
    path:"/shop/listing"

  },
  {
    id:'women',
    label:"Women",
    path:"/shop/listing"

  },
  {
    id:'kid',
    label:"Kid",
    path:"/shop/listing"

  },
  {
    id:'watch',
    label:"Watch",
    path:"/shop/listing"

  },
]


export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormElements = [
    {
        label: "Street Address",
        name: "street",
        componentType: "input",
        type: "text",
        placeholder: "Enter street address",
    },
    {
        label: "Address Line 2 (Optional)",
        name: "addressLine2",
        componentType: "input",
        type: "text",
        placeholder: "Apt, suite, building, etc.",
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter city",
    },
    {
        label: "State / Province",
        name: "state",
        componentType: "input",
        type: "text",
        placeholder: "Enter state or province",
    },
    {
        label: "Postal Code / ZIP",
        name: "postalCode",
        componentType: "input",
        type: "text",
        placeholder: "Enter postal code",
    },
    {
        label: "Country",
        name: "country",
        componentType: "input",
        type: "text",
        placeholder: "Enter country",
    },
    {
        label: "Phone Number (Optional)",
        name: "phoneNumber",
        componentType: "input",
        type: "tel", // 'tel' is better for phone numbers
        placeholder: "Enter phone number for delivery",
    },
];