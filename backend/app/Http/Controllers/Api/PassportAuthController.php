<?php
 
namespace App\Http\Controllers\API;
 
use App\Http\Controllers\Controller;
 
use Illuminate\Http\Request;
 
use App\Models\User;

use Illuminate\Support\Facades\Validator;
 
class PassportAuthController extends Controller
{
    /**
     * Registration Req
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(),
       [
        'name' => 'required|min:4',
        'email' => 'required|email',
        'password' => 'required|min:8',
       ]
    );
        if($validator->fails()){
            return response()->json(["validattion_errors"=>$validator->errors()]);
        }
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        //Set default role of self sign up user to Product Manager (id:3) 
        $user->assignRole("3");
  
        $token = $user->createToken('Personal Access Token')->accessToken;
        // Extract token value
        $tokenValue = $token->token;
  
        if(!is_null($user)){
            return response()->json([ "success" => true, "data" => $user,  'token' => $tokenValue], 200);
        }else {
            return response()->json([ "success" => false, "message" => "User not created"], 404);
        }
    }
  
    /**
     * Login Req
     */
    public function login(Request $request)
    {
        $data = [
            'email' => $request->email,
            'password' => $request->password
        ];
  
        if (auth()->attempt($data)) {
            $user = auth()->user();
    
            $user->getRoleNames();
    
            // Generate personal access token
            $token = $user->createToken('Personal Access Token')->accessToken;
    
            return response()->json([
                "success" => true,
                "access_token" => $token,  // Send the token to the frontend
                "user" => $user  // Send user information if needed
            ], 200);
        } else {
            return response()->json([
                "success" => false,
                "message" => "Invalid username or password"  // Adjust the message if needed
            ], 401); 
        }
    }

    public function userInfo() 
    {
 
     $user = auth()->user();
      
    //  return response()->json(['user' => $user], 200);
     if(!is_null($user)){
        return response()->json([ "success" => true, "user" => $user], 200);
       }else {
        return response()->json([ "success" => false, "message" => "No user found"], 404);
    }
 
    }
}