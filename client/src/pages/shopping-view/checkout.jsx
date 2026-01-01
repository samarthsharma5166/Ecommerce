import React from 'react'

function Shoppincheckout() {
  return (
    <div class="bg-white">
      <div class="flex max-md:flex-col gap-12 max-lg:gap-4 h-full">
        <div class="bg-gray-100 md:h-screen md:sticky md:top-0 md:min-w-[370px]">
          <div class="relative h-full">
            <div class="px-6 py-8 md:overflow-auto md:h-screen">
              <div class="space-y-4">
                <div class="flex items-start gap-4">
                  <div class="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                    <img src='https://readymadeui.com/images/black-sweaters-1.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-sm text-slate-900 font-semibold">Black Sweater</h3>
                    <ul class="text-xs text-slate-900 space-y-2 mt-3">
                      <li class="flex flex-wrap gap-4">Quantity <span class="ml-auto">2</span></li>
                      <li class="flex flex-wrap gap-4">Total Price <span class="ml-auto font-semibold">$40</span></li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                    <img src='https://readymadeui.com/images/dark-green-tshirt-2.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-sm text-slate-900 font-semibold">Dark Green Tshirt</h3>
                    <ul class="text-xs text-slate-900 space-y-2 mt-3">
                      <li class="flex flex-wrap gap-4">Quantity <span class="ml-auto">1</span></li>
                      <li class="flex flex-wrap gap-4">Total Price <span class="ml-auto font-semibold">$16</span></li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                    <img src='https://readymadeui.com/images/green-jacket-3.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-sm text-slate-900 font-semibold">Jacket</h3>
                    <ul class="text-xs text-slate-900 space-y-2 mt-3">
                      <li class="flex flex-wrap gap-4">Quantity <span class="ml-auto">1</span></li>
                      <li class="flex flex-wrap gap-4">Total Price <span class="ml-auto font-semibold">$16</span></li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-24 h-24 flex p-3 shrink-0 bg-white rounded-md">
                    <img src='https://readymadeui.com/images/product14.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-sm text-slate-900 font-semibold">Black & White Sneakers</h3>
                    <ul class="text-xs text-slate-900 space-y-2 mt-3">
                      <li class="flex flex-wrap gap-4">Quantity <span class="ml-auto">1</span></li>
                      <li class="flex flex-wrap gap-4">Total Price <span class="ml-auto font-semibold">$16</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <hr class="border-gray-300 my-8" />
              <div>
                <ul class="text-slate-500 font-medium space-y-4">
                  <li class="flex flex-wrap gap-4 text-sm">Subtotal <span class="ml-auto font-semibold text-slate-900">$102.00</span></li>
                  <li class="flex flex-wrap gap-4 text-sm">Shipping <span class="ml-auto font-semibold text-slate-900">$6.00</span></li>
                  <li class="flex flex-wrap gap-4 text-sm">Tax <span class="ml-auto font-semibold text-slate-900">$5.00</span></li>
                  <hr class="border-slate-300" />
                  <li class="flex flex-wrap gap-4 text-[15px] font-semibold text-slate-900">Total <span class="ml-auto">$113.00</span></li>
                </ul>

                <div class="mt-8">
                  <button type="button" class="rounded-md px-4 py-2.5 w-full text-sm font-medium tracking-wide bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Complete Purchase</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-4xl w-full h-max rounded-md px-4 py-8 max-md:-order-1">
          <form>
            <div>
              <h2 class="text-xl text-slate-900 font-semibold mb-6">Delivery Details</h2>
              <div class="grid lg:grid-cols-2 gap-y-6 gap-x-4">
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">First Name</label>
                  <input type="text" placeholder="Enter First Name"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Last Name</label>
                  <input type="text" placeholder="Enter Last Name"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Email</label>
                  <input type="email" placeholder="Enter Email"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Phone No.</label>
                  <input type="number" placeholder="Enter Phone No."
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Address Line</label>
                  <input type="text" placeholder="Enter Address Line"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">City</label>
                  <input type="text" placeholder="Enter City"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">State</label>
                  <input type="text" placeholder="Enter State"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <label class="text-sm text-slate-900 font-medium block mb-2">Zip Code</label>
                  <input type="text" placeholder="Enter Zip Code"
                    class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
              </div>
            </div>

            <div class="mt-12">
              <h2 class="text-xl text-slate-900 font-semibold mb-6">Payment</h2>
              <div class="grid gap-4 lg:grid-cols-2">
                <div class="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div>
                    <div class="flex items-center">
                      <input type="radio" name="method" class="w-5 h-5 cursor-pointer" id="card" checked />
                      <label for="card" class="ml-4 flex gap-2 cursor-pointer">
                        <img src="https://readymadeui.com/images/visa.webp" class="w-12" alt="card1" />
                        <img src="https://readymadeui.com/images/american-express.webp" class="w-12" alt="card2" />
                        <img src="https://readymadeui.com/images/master.webp" class="w-12" alt="card3" />
                      </label>
                    </div>
                  </div>
                  <p class="mt-4 text-sm text-slate-500 font-medium">Pay with your debit or credit card</p>
                </div>
                <div class="bg-gray-100 p-4 rounded-md border border-gray-300 max-w-sm">
                  <div>
                    <div class="flex items-center">
                      <input type="radio" name="method" class="w-5 h-5 cursor-pointer" id="paypal" />
                      <label for="paypal" class="ml-4 flex gap-2 cursor-pointer">
                        <img src="https://readymadeui.com/images/paypal.webp" class="w-20" alt="paypalCard" />
                      </label>
                    </div>
                  </div>
                  <p class="mt-4 text-sm text-slate-500 font-medium">Pay with your paypal account</p>
                </div>
              </div>
            </div>

            <div class="mt-12 max-w-md">
              <p class="text-slate-900 text-sm font-medium mb-2">Do you have a promo code?</p>
              <div class="flex gap-4">
                <input type="email" placeholder="Promo code"
                  class="px-4 py-2.5 bg-white border border-gray-400 text-slate-900 w-full text-sm rounded-md focus:outline-blue-600" />
                <button type='button' class="flex items-center justify-center font-medium tracking-wide bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md text-sm text-white cursor-pointer">
                  Apply
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Shoppincheckout