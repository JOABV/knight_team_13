package com.knight.app.Controller;

import com.knight.app.entities.User;
import com.knight.app.Repository.UserRepository;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping(path="/user")
public class UserController {
	@Autowired
	private UserRepository userRepository;

	@GetMapping("/homepage")
	public String index(){
		return "homepage";
	}

	//register
	@PostMapping(path="/register")
	public @ResponseBody JSONObject User_register (@RequestBody JSONObject jso) {
		JSONObject result = new JSONObject();

		if (userRepository.exists(jso.getString("phone_number"))){
			result.put("Checkcode", "200");
			result.put("Message", "exists");
			return result;
		}
		String phone_number = jso.getString("phone_number");
		String password = jso.getString("password");
		String id_number = jso.getString("id_number");
		String full_name = jso.getString("full_name");

		User n = new User(phone_number, password, id_number, full_name);
		userRepository.save(n);

		result.put("Checkcode", "100");
		result.put("Message", "success");

		return result;
	}
	//login
	@PostMapping(path="/login")
	public @ResponseBody JSONObject User_login (@RequestBody JSONObject user) {

		JSONObject jso = new JSONObject();
		User user1 = userRepository.findOne(user.getString("phone_number"));
		if (user1 == null) {
			jso.put("Checkcode", "200");
			jso.put("Message", "not exist");
		}else{
			if(user1.getPassword().compareTo(user.getString("password")) != 0){
				jso.put("Checkcode", "201");
				jso.put("Message", "wrong password");
			}else{
				jso.put("Checkcode", "100");
				jso.put("Message", "success");
			}
		}
		return jso;
	}

	//Information_show
	@PostMapping(path="/personal_information/pi")
	public @ResponseBody JSONObject personal_information_show (@RequestBody JSONObject jsonobject) {

		JSONObject jso = new JSONObject();
		User user = userRepository.findOne(jsonobject.getString("phone_number"));
		if (user == null){
			if (! userRepository.exists(jsonobject.getString("phone_number"))){
				jso.put("Checkcode", "200");
				jso.put("Message", "not exist");
			}
		}else{
			jso.put("Checkcode", "100");
			jso.put("Message", user);
		}
		return jso;
	}

	//information_change
	@PostMapping(path="/personal_information/ci")
	public @ResponseBody JSONObject personal_information_change (@RequestBody JSONObject json) {
		JSONObject jso = new JSONObject();
		User user = userRepository.findOne(json.getString("phone_number"));
		if (user == null){
			if (! userRepository.exists(json.getString("phone_number"))){
				jso.put("Checkcode", "200");
				jso.put("Message", "the user doesn't exist");
			}
		}else{
			user.setEmail(json.getString("email"));
			userRepository.save(user);
			jso.put("Checkcode", "100");
			jso.put("Message", user);
		}
		return jso;
	}

	//information_change
	@PostMapping(path="/personal_information/change_password")
	public @ResponseBody JSONObject password_change (@RequestBody JSONObject json) {
		JSONObject jso = new JSONObject();
		User user = userRepository.findOne(json.getString("phone_number"));
		if (user == null){
			if (! userRepository.exists(json.getString("phone_number"))){
				jso.put("Checkcode", "200");
				jso.put("Message", "the user doesn't exist");
			}
		}else{
			user.setPassword(json.getString("password"));
			userRepository.save(user);
			jso.put("Checkcode", "100");
			jso.put("Message", user);
		}
		return jso;
	}
}
