<form action="{{route('showPaymentForm')}}" method="post">

    @csrf
    <label>Amount</label>
    <input type="text" name="ShoppingCartAmount" value="{{$product['price']}}">

    <label>Currency</label>
    <input type="text" name="ShoppingCartCurrencyShort" value="$">


    <label>Order ID</label>
    <input type="text" name="ShoppingCartOrderID" value="{{$product['name']}}">


    <labe>Description</labe>
    <input type="text" name="ShoppingCartOrderDescription" value="abc">

    <input type="hidden" name="ShoppingCartHashDigest" value="{{$HashDigest}}">

    <input type="submit" value="submitBtn">

</form>
