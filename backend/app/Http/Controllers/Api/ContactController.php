<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function submit_contact_form(Request $request){
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::raw(
            "Contact Us Enquiry\n\n" .
            "Full Name: " . $request->input('full_name') . "\n" .
            "subject: " . $request->input('subject') . "\n" .
            "Email: " . $request->input('email') . "\n" .
            "Message:\n" . $request->input('message'),
            function ($mail) use ($request) {
                $mail->to('info.madeinnas@gmail.com')
                    ->subject('Contact Us Enquiry')
                    ->replyTo($request->input('email'));
            }
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry sent successfully'
        ]);
    }
}
