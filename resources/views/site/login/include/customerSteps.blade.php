<form class="customerSteps">
    @csrf
    <input type="hidden" name="type" value="lendor">
    <div class="hide_loginb customerStep1"  id="tab-1bb">
        {{--    <form >--}}
        <div class="form-af-be">
            <input class="input1000 first_name" onkeypress="return isCharacterKey(event)"  type="text" name="first_name" required>
            <span class="focus-input1000" data-placeholder="First Name"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 last_name" onkeypress="return isCharacterKey(event)"  type="text" name="last_name" required>
            <span class="focus-input1000" data-placeholder="Last Name"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 phone" onkeypress="return isPhoneNumber(event)" type="text" name="phone" required>
            <span class="focus-input1000" data-placeholder="Phone"></span>
        </div>
        <button class="step1CustomerNext" type="button">Next</button>
        {{--    </form>--}}
    </div>
    <div class="hide_loginb customerStep2" style="display: none" id="tab-2bb">
        {{--    <form class="lendorStep2">--}}
        <div class="form-af-be">
            <input class="input1000 company" onkeypress="return isCharacterKey(event)" type="text" name="company" required>
            <span class="focus-input1000"  data-placeholder="Company"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 position" onkeypress="return isCharacterKey(event)" type="text" name="position" required>
            <span class="focus-input1000" data-placeholder="Position"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 street" onkeypress="return isCharacterKey(event)" type="text" name="street" required>
            <span class="focus-input1000" data-placeholder="Street"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 postal_code" type="text"  name="postal_code" required>
            <span class="focus-input1000" data-placeholder="postal_code"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 city" onkeypress="return isCharacterKey(event)" type="text" name="city" required>
            <span class="focus-input1000" data-placeholder="City"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 country" onkeypress="return isCharacterKey(event)" type="text" name="country" required>
            <span class="focus-input1000" data-placeholder="Country"></span>
        </div>
        <button class="step2CustomerNext" type="button">Next</button>
        {{--    </form>--}}
    </div>
    <div class="hide_loginb customerStep3" style="display: none" id="tab-3bb">
        {{--    <form class="lendorStep3">--}}
        <div class="form-af-be">
            <input class="input1000" type="email" name="email" required>
            <span class="focus-input1000" data-placeholder="Email"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 password" type="password" name="password" required>
            <span class="focus-input1000" data-placeholder="Password"></span>
        </div>
        <div class="form-af-be">
            <input class="input1000 password_confirmation" type="password" name="password_confirmation" required>
            <span class="focus-input1000" data-placeholder="Password Confirmation"></span>
        </div>
        <div class="form-af-be">
            <select class="input1000" name="hear_about" required>
                <option value="select"></option>
                <option value="Direct contact by oceanis">Direct contact by oceanis</option>
                <option value="Search Engine">Search Engine</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Print & Media">Print & Media</option>
                <option value="Word of mouth">Word of mouth</option>
                <option value="Newsletter">Newsletter</option>
                <option value="Other">Other</option>
            </select>
            <span class="focus-input1000" data-placeholder="How did you hear about us?"></span>
        </div>
        <label class="container_cDDk">I agree to the <a href="#">privacy policy</a>
            <input type="checkbox" name="policyCheck">
            <span class="checkmark_cDDk">
                <span class="checkmark_hover"></span>
            </span>
        </label>
        <label class="container_cDDk">I agree to the <a href="#">terms and condition</a>
            <input type="checkbox" name="termsCheck">
            <span class="checkmark_cDDk">
                <span class="checkmark_hover"></span>
            </span>
        </label>
        <button type="button" class="finishCustomerRegisterBtn">Register</button>
        {{--    </form>--}}
    </div>


</form>
