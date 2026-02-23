<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Mail;

class PartnershipController extends Controller
{
    public function submit_form(Request $request){
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'organization' => 'required|string|max:255',
            'email' => 'required|email',
            'partnership_type' => 'required|string',
            'message' => 'required|string',
        ]);

        Mail::raw(
            "New Partnership Inquiry\n\n" .
            "Full Name: " . $request->input('full_name') . "\n" .
            "Organization: " . $request->input('organization') . "\n" .
            "Email: " . $request->input('email') . "\n" .
            "Partnership Type: " . $request->input('partnership_type') . "\n\n" .
            "Message:\n" . $request->input('message'),
            function ($mail) use ($request) {
                $mail->to('info.madeinnas@gmail.com')
                    ->subject('New Partnership Inquiry')
                    ->replyTo($request->input('email'));
            }
        );

        return response()->json([
            'status' => 'success',
            'message' => 'Inquiry sent successfully'
        ]);
    }
}