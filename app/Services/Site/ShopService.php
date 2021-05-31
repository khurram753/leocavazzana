<?php


namespace App\Services\Site;


use App\AboutUs;
use App\Customer;
use App\HomePage;
use App\Order;
use App\Product;
use App\Shop;
use Illuminate\Support\Facades\Auth;
use phpDocumentor\Reflection\Types\Compound;
use Stripe\Checkout\Session;
use Stripe\PaymentIntent;
use Stripe\Stripe;

class ShopService
{

    public function __construct()
    {
        Stripe::setApiKey(env('STRIPE_SECRET'));
    }

    public function index($request)
    {
        $data = HomePage::first();
        $products = Product::all();

        if ($request->has('success') && \Illuminate\Support\Facades\Session::get('stripe_session_id')) {

//            Stripe::setApiKey(env('STRIPE_SECRET'));

            $retrieveStripeSession = Session::retrieve(\Illuminate\Support\Facades\Session::get('stripe_session_id'));

            if ($retrieveStripeSession) {
                $getPaymentIntent = PaymentIntent::retrieve($retrieveStripeSession->payment_intent);

                if ($getPaymentIntent) {
                    $customOrder = Order::where('stripe_session_id', \Illuminate\Support\Facades\Session::get('stripe_session_id'))->first();
                    if ($customOrder) {
                        $customOrder->status = $retrieveStripeSession->payment_status;

                        $customOrder->city = $getPaymentIntent->charges->data[0]->billing_details->address->city;
                        $customOrder->country = $getPaymentIntent->charges->data[0]->billing_details->address->country;
                        $customOrder->postal_code = $getPaymentIntent->charges->data[0]->billing_details->address->postal_code;
                        $customOrder->line1 = $getPaymentIntent->charges->data[0]->billing_details->address->line1;
                        $customOrder->line2 = $getPaymentIntent->charges->data[0]->billing_details->address->line2;
                    }

                    $customOrder->save();
                    $request->session()->forget('stripe_session_id');

                }
            }
        }


        return view('site.shop.shop', compact('data', 'products'));
    }

    public function detail($id)
    {
        $product = Product::find($id);
        if ($product) {
            return view('site.shop.shop_detail', compact('product'));
        } else {
            return redirect()->back()->with('error', 'Record Not Found');
        }

    }

    public function createSession($request)
    {
        $data = Product::find($request->product_id);


        if ($data) {

            $name = $data->name_english;
            if(session()->get('language') == 'english')
            {
                $name = $data->name_english;
            }
            elseif(session()->get('language') == 'french')
            {
                $name = $data->name_french;
            }
            elseif(session()->get('language') == 'russia')
            {
                $name = $data->name_russia;
            }
            else
            {
                $name = $data->name_english;
            }

//            dd(public_path($data->featured_image),asset($data->featured_image));

            $session = Session::create([
                'billing_address_collection' => 'required',
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $data->name_english,
//                            'images' => [asset($data->featured_image)],

                        ],
                        'unit_amount_decimal' => $data->price * 100,
                    ],
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('shop', ['success' => 'true']),
                'cancel_url' => route('shop', ['error' => 'true']),
            ]);

            if ($session->id) {
                $order = new Order();

                $order->user_id = Auth::user()->id;
                $order->stripe_session_id = $session->id;
                $order->product_id = $data->id;
                $order->status = 'pending';
                $order->price = $data->price;

                if ($order->save()) {
                    $request->session()->put([
                        'stripe_session_id' => $session->id
                    ]);

                    return response()->json(['result' => 'success', 'data' => $session->id]);
                } else {
                    return response()->json(['result' => 'error', 'message' => 'Error Came. Try again Later']);
                }
            } else {
                return response()->json(['result' => 'error', 'message' => 'Error Came. Try again Later']);
            }
        } else {
            return response()->json(['result' => 'error', 'message' => 'Record Not Found']);
        }

    }

}
