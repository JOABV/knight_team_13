package com.knight.app.Controller;

import com.knight.app.entities.User;
import com.knight.app.entities.Policy;
import com.knight.app.Repository.PolicyRepository;
import com.knight.app.Repository.UserRepository;
import com.knight.app.mapper.UserMapper;
import net.sf.json.JSON;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jackson.JsonObjectDeserializer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@CrossOrigin
@RequestMapping(path="/user")
public class UserController {
	@Autowired
	private UserRepository userRepository;
//	@Autowired
	private UserMapper userMapper;
	@Autowired
	private PolicyRepository policyRepository;
	@GetMapping("/homepage")
	public String index(){
		return "homepage";
	}

	//register
	@PostMapping(path="/register")
	public @ResponseBody JSONObject User_register (@RequestBody JSONObject jso) {
		JSONObject json = new JSONObject();

		json.put("Checkcode", "100");
		json.put("Message", jso.getString("id_number"));

//		if (userRepository.exists(user.getPhone())){
//			return "Wrong: the user already exists";
//		}
//		User n = new User();
//		n.setPhone(user.getPhone());
//		n.setPassword(user.getPassword());
//		userRepository.save(n);
		return json;
	}
	//login
	@PostMapping(path="/login")
	public @ResponseBody JSONObject User_login (@RequestBody User user) {

		JSONObject jso = new JSONObject();
		User user1 = userRepository.findOne(user.getPhone());
		if (user1 == null){
            if (! userRepository.exists(user.getPhone())){
                jso.put("Checkcode", 200);
                jso.put("Message", "not exist");
            }else{
				jso.put("Checkcode", 201);
				jso.put("Message", "wrong password");
            }
		}else{
			jso.put("Checkcode", 100);
			jso.put("Message", "success");
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
				jso.put("Checkcode", 200);
				jso.put("Message", "not exist");
			}
		}else{
			jso.put("Checkcode", 100);
			jso.put("Message", user);
		}
		return jso;
	}
	//information_change
	@PostMapping(path="/personal_information/ci")
	public @ResponseBody JSONObject personal_information_change (@RequestBody JSONObject json) {
		//TODO
		JSONObject jso = new JSONObject();
		User user = userRepository.findOne(json.getString("phone_number"));
		if (user == null){
			if (! userRepository.exists(json.getString("phone_number"))){
				jso.put("Checkcode", 200);
				jso.put("Message", "the user doesn't exist");
			}
		}else{
			user.setEmail(json.getString("email"));
			userMapper.updateUser(user);
			jso.put("Checkcode", 100);
			jso.put("Message", user);
		}
		return jso;
	}


//	@GetMapping(path="/all")
//	public @ResponseBody Iterable<User> getAllUsers() {
//		return userRepository.findAll();
//	}

}
