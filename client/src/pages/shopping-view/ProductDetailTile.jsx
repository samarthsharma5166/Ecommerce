import { getProductDetail } from '@/store/listing/prouductSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

const ProductDetailTile = () => {
    const dispatch = useDispatch(); 
    const params = useParams();
    const { productDetail } = useSelector(state => state.products);
    const [imageIndex, setImageIndex] = React.useState(0);
    const navigate = useNavigate();

    async function fetchProduct(){
        const id = await params.id;
        const res = await dispatch(getProductDetail({id}))
    }

    console.log(productDetail);
    useEffect(() => {
        fetchProduct();
    },[params]);

  return (
      <div className="p-4">
          <div className="lg:max-w-6xl max-w-xl mx-auto">
              <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-8 max-lg:gap-12 max-sm:gap-8">
                  <div className="w-full lg:sticky top-0">
                      <div className="flex flex-row gap-2">
                          <div className="flex flex-col gap-2 w-16 max-sm:w-14 shrink-0">
                            {
                                  productDetail?.images?.map((image,index) =>
                                      <img onClick={() => setImageIndex(index)} key={index} src={`${import.meta.env.VITE_IMAGE_URL}/${image}`} alt="Product1" className="aspect-64/85 object-cover object-top w-full cursor-pointer  border-b-2 border-black" /> )
                            }
                          </div>
                          <div className="flex-1">
                              <img src={`${import.meta.env.VITE_IMAGE_URL}/${productDetail?.images[imageIndex]}`} alt="Product"
                                  className="w-full  aspect-548/712 object-cover" />
                          </div>
                      </div>
                  </div>

                  <div className="w-full">
                      <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{productDetail?.title}</h3>
                          <p className="text-slate-500 mt-2 text-sm">{productDetail?.description}
                      
                          </p>
                          <div className="flex items-center flex-wrap gap-4 mt-6">
                              <h4 className="text-slate-900 text-2xl sm:text-3xl font-semibold">₹{productDetail?.price}</h4>
                              <p className="text-slate-500 text-lg"><strike>$16</strike> <span className="text-sm ml-1.5">Tax included</span></p>
                          </div>

                          <div className="flex items-center gap-4 mt-4">
                              <div className="flex items-center gap-1 text-lg px-2.5 bg-green-600 text-white rounded-full">
                                  <p>4</p>
                                  <svg className="w-[13px] h-[13px] fill-white" viewBox="0 0 14 13" fill="none"
                                      xmlns="http://www.w3.org/2000/svg">
                                      <path
                                          d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                  </svg>
                              </div>
                              <p className="text-slate-500 text-sm">253 ratings and 27 reviews</p>
                          </div>
                      </div>

                      <hr className="my-6 border-slate-300" />

                      <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Sizes</h3>
                          <div className="flex flex-wrap gap-4 mt-4">
                              {productDetail?.variants?.map(v => (
                                  <button
                                      key={v.id}
                                      className="w-18 h-10 border border-slate-300 hover:border-blue-600 text-sm cursor-pointer flex items-center justify-center shrink-0"
                                  >
                                    <span>
                                          {`${v.size} - (${v.color})`}
                                    </span>
                                  </button>
                              ))}
                          </div>


                          <div className="mt-6 flex flex-wrap gap-4">
                              <button type="button"
                                  className="px-4 rounded-md py-3 w-[45%] cursor-pointer border border-slate-300 bg-slate-100 hover:bg-slate-200 text-slate-900 text-sm font-medium">Add
                                  to cart</button>
                              <button onClick={() => navigate('/shop/checkout')} type="button"
                                  className="px-4 py-3 w-[45%] cursor-pointer border rounded-md bg-black text-white text-sm  font-medium">Buy Now</button>
                          </div>
                      </div>


                      <hr className="my-6 border-slate-300" />

                      <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Product Information</h3>
                          {/* <div className="mt-4" role="accordion">
                              <div className="hover:bg-slate-100 transition-all">
                                  <button type="button"
                                      className="w-full text-sm font-semibold cursor-pointer text-left px-4 py-2.5 text-slate-900 flex items-center">
                                      <span className="mr-4">Product details</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current ml-auto shrink-0 -rotate-180"
                                          viewBox="0 0 24 24">
                                          <path fill-rule="evenodd"
                                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                              clip-rule="evenodd" data-original="#000000"></path>
                                      </svg>
                                  </button>
                                  <div className="pb-4 px-4">
                                      <p className="text-sm text-slate-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing
                                          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                  </div>
                              </div>

                              <div className="hover:bg-slate-100 transition-all">
                                  <button type="button"
                                      className="w-full text-sm font-semibold cursor-pointer text-left px-4 py-2.5 text-slate-900 flex items-center">
                                      <span className="mr-4">Vendor details</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current ml-auto shrink-0 -rotate-90"
                                          viewBox="0 0 24 24">
                                          <path fill-rule="evenodd"
                                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                              clip-rule="evenodd" data-original="#000000"></path>
                                      </svg>
                                  </button>
                                  <div className="pb-4 px-4 hidden">
                                      <p className="text-sm text-slate-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing
                                          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                  </div>
                              </div>

                              <div className="hover:bg-slate-100 transition-all">
                                  <button type="button"
                                      className="w-full text-sm font-semibold cursor-pointer text-left px-4 py-2.5 text-slate-900 flex items-center">
                                      <span className="mr-4">Return and exchange policy</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 fill-current ml-auto shrink-0 -rotate-90"
                                          viewBox="0 0 24 24">
                                          <path fill-rule="evenodd"
                                              d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
                                              clip-rule="evenodd" data-original="#000000"></path>
                                      </svg>
                                  </button>
                                  <div className="pb-4 px-4 hidden">
                                      <p className="text-sm text-slate-500 leading-relaxed">Lorem ipsum dolor sit amet, consectetur adipiscing
                                          elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                  </div>
                              </div>
                          </div> */}
                          <div className="mt-4">
                              {productDetail?.info?.map((info,index) => (
                                  <div key={info.id} className={`flex justify-between py-4 border-b border-gray-300 text-sm ${index === productDetail.info.length - 1 ? 'border-b-0' : ''}`}>
                                      <span className="font-bold text-slate-900">{info.key}</span>
                                      <span className="font-semibold text-slate-600">{info.value}</span>
                                  </div>
                              ))}
                          </div>

                      </div>

                      <hr className="my-6 border-slate-300" />

                      <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Customer Reviews</h3>
                          <div className="flex items-center gap-1.5 mt-6">
                              <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg className="w-5 h-5 fill-blue-600" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                              <svg className="w-5 h-5 fill-[#CED5D8]" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path
                                      d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                              </svg>
                          </div>

                          <div className="flex items-center flex-wrap gap-4 mt-4">
                              <h4 className="text-2xl sm:text-3xl text-slate-900 font-semibold">4.0 / 5</h4>
                              <p className="text-sm text-slate-500">Based on 253 ratings</p>
                          </div>
                      </div>

                      <div className="mt-6">
                          <div className="flex items-start">
                              <img src="https://readymadeui.com/team-2.webp" className="w-12 h-12 rounded-full border-2 border-white" />
                              <div className="ml-3">
                                  <h4 className="text-slate-900 text-sm font-semibold">John Doe</h4>
                                  <div className="flex space-x-1 mt-1">
                                      <svg className="w-[14px] h-[14px] fill-blue-600" viewBox="0 0 14 13" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                      </svg>
                                      <svg className="w-[14px] h-[14px] fill-blue-600" viewBox="0 0 14 13" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                      </svg>
                                      <svg className="w-[14px] h-[14px] fill-blue-600" viewBox="0 0 14 13" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                      </svg>
                                      <svg className="w-[14px] h-[14px] fill-blue-600" viewBox="0 0 14 13" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                      </svg>
                                      <svg className="w-[14px] h-[14px] fill-[#CED5D8]" viewBox="0 0 14 13" fill="none"
                                          xmlns="http://www.w3.org/2000/svg">
                                          <path
                                              d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                                      </svg>
                                      <p className="text-xs text-slate-500 !ml-2">2 months ago</p>
                                  </div>
                                  <p className="text-sm text-slate-500 mt-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                                      eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                              </div>
                          </div>
                          <a href="javascript:void(0)" className="block text-blue-600 hover:underline text-sm mt-6 font-semibold">Read all
                              reviews</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default ProductDetailTile