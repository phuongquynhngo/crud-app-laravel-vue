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

            // Generate personal access token
            $token = $user->createToken('Personal Access Token')->accessToken;
            // Extract token value
            $tokenValue = $token->token;

            return response()->json([ "success" => true, "login" => true, "token" =>  $tokenValue, "data" => $user], 200);
        } else {
            // return response()->json(['error' => 'Unauthorised'], 401);
            return response()->json([ "success" => false, "message" => "Invalid email or password"], 401);
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