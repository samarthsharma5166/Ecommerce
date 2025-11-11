

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

