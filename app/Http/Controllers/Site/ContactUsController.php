<?php

namespace App\Http\Controllers\Site;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactUsRequest;
use App\Services\Site\ContactUsService;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    //
    public function index(ContactUsService $contactUsService)
    {
        return $contactUsService->index();
    }

    public function postContactUs(Request $request,ContactUsService $contactUsService)
    {
        if(session()->get('language') == 'english')
        {
            $customMsg = [
                'name.required' => 'Name is a required field',
                'phone.required' => 'Phone Number is a required field',
                'email.required' => 'Email is a required field',
                'email.email' => 'Email must be a valid email address',
                'company.required' => 'Company Name is a required field',
                'message.required' => 'Message is a required field',

            ];
        }
        elseif(session()->get('language') == 'russia')
        {
            $customMsg = [
                'name.required' => 'Имя - обязательное поле',
                'phone.required' => 'Номер телефона - обязательное поле',
                'email.required' => 'Электронная почта является обязательным полем',
                'email.email' => 'Электронная почта должна быть действующим адресом электронной почты',
                'company.required' => 'Название компании - обязательное поле',
                'message.required' => 'Сообщение - обязательное поле',

            ];
        }
        elseif(session()->get('language') == 'french')
        {
            $customMsg = [
                'name.required' => 'Le nom est un champ obligatoire',
                'phone.required' => 'Le numéro de téléphone est un champ obligatoire',
                'email.required' => 'L\'email est un champ obligatoire',
                'email.email' => 'L\'e-mail doit être une adresse e-mail valide',
                'company.required' => 'Le nom de l\'entreprise est un champ obligatoire',
                'message.required' => 'Le message est un champ obligatoire',

            ];
        }
        else{
            $customMsg = [
                'name.required' => 'Name is a required field',
                'phone.required' => 'Phone Number is a required field',
                'email.required' => 'Email is a required field',
                'email.email' => 'Email must be a valid email address',
                'company.required' => 'Company Name is a required field',
                'message.required' => 'Message is a required field',

            ];
        }

        $this->validate($request,[
            'name' => 'required',
            'phone' => 'required',
            'email' => 'required|email',
            'company' => 'required',
            'message' => 'required'
        ],$customMsg);

        return $contactUsService->sendEmail($request);
    }
}
